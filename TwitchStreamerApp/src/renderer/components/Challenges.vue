<template>
  <div>
    <h1
        v-show="hardModeOn"
        class="hmTitle">
      EXSTREAM MODE ACTIVATED
    </h1>
    <div
        v-show="hardModeOn"
        class="challengeList">
      <h1
          v-for="challenge in challenges"
          :key="challenge.name">
        {{ convertTime(challenge.duration) }}: {{ challenge.displayName }}
      </h1>
    </div>
    <circles
        :greyscale="greyscale"
        :intensity="intensity"
        v-if="loaded && showCircles"/>
    <image-rain
        :greyscale="greyscale"
        :intensity="intensity"
        v-if="loaded && showRain"
        :text="rainText"/>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  import * as d3 from 'd3';

  import Circles from './Circles';
  import ImageRain from './LandingPage/ImageRain';

  export default {
    name: 'Challenges',
    components: { ImageRain, Circles },
    props: {
      intensity: {
        default: 10,
      },
      greyscale: {
        default: false,
      },
      username: {
        default: 123,
      },
    },
    data() {
      return {
        loaded: false,

        challenges: [],
        showCircles: false,
        showRain: false,
        showColorShift: false,
      };
    },
    created() {
      this.$emit('bg', 'rgba(0, 0, 0, 0)');
    },
    mounted() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.svg = d3.select(this.$el)
        .append('svg')
        .attr('id', 'svg')
        .attr('width', width)
        .attr('height', height)
        .style('position', 'absolute')
        .append('g');
      this.loaded = true;

      /* Event socket */
      this.initSocket();

      // this.addChallenge('colorShift', 'showColorShift', 'Color Shift', 9);
      // this.addChallenge('raveParty', 'showCircles', 'Rave Party', 12);
      // this.addChallenge('rainingText', 'showRain', 'Text Rain', 15);

      setInterval(() => {
        this.challenges.forEach((challenge) => {
          challenge.duration -= 1;
        });
        this.challenges.filter(challenge => challenge.duration <= 0).forEach((challenge) => {
          this.$set(this, challenge.boolName, false);
        });
        this.challenges = this.challenges.filter(challenge => challenge.duration > 0);
      }, 1000);
    },
    computed: {
      hardModeOn() {
        return this.showCircles || this.showRain || this.showColorShift;
      },
    },
    watch: {
      showColorShift() {
        if (this.showColorShift) {
          this.colorShift();
          const interval = Math.round(1000 / (this.intensity / 20));
          this.colorShiftLoopID = setInterval(this.colorShift, interval);
        } else {
          clearInterval(this.colorShiftLoopID);
          this.$emit('bg', 'rgba(0, 0, 0, 0)');
        }
      },
    },
    methods: {
      initSocket() {
        this.socket = io.connect('http://7c03d8c0.ngrok.io/');

        this.socket.on('connected', () => {
          this.socket.emit('register_room', { id: this.username });
        });

        this.socket.on('event', (data) => {
          switch (data.id) {
            case 'rainingText':
              this.addChallenge('rainingText', 'showRain', 'Text Rain', 180);
              this.rainText = data.text;
              break;
            case 'raveParty':
              this.addChallenge('raveParty', 'showCircles', 'Rave Party', 180);
              break;
            case 'colorShift':
              this.addChallenge('colorShift', 'showColorShift', 'Color Shift', 180);
              break;
            default:
              break;
          }
        });

        this.socket.on('disconnect', () => {
        });
      },

      addChallenge(name, boolName, displayName, duration) {
        const idx = this.challenges.findIndex(challenge => challenge.name === name);
        if (idx !== -1) this.challenges[idx].duration += duration;
        else {
          this.challenges.push({
            name, boolName, displayName, duration,
          });
        }
        this.$set(this, boolName, true);
      },

      colorShift() {
        const r = Math.round(Math.random() * 256);
        const g = Math.round(Math.random() * 256);
        const b = Math.round(Math.random() * 256);
        const a = (Math.random() / 3) + 0.2;
        if (this.greyscale) this.$emit('bg', `rgba(${g}, ${g}, ${g}, ${a})`);
        this.$emit('bg', `rgba(${r}, ${g}, ${b}, ${a})`);
      },

      convertTime(duration) {
        const s = (`00${duration % 60}`).slice(-2);
        const m = (`00${Math.floor(duration / 60) % 60}`).slice(-2);
        const h = Math.floor(duration / 3600) % 24;
        return `${h ? `${h}:` : ''}${m}:${s}`;
      },

      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
    destroyed() {
      this.socket.emit('disconnected', { id: 123 });
    },
  };
</script>

<style>
  .hmTitle {
    font: 40px dpcomic;
    height: 56px;
    vertical-align: center;

    color: white;
    text-shadow: -2px 0 #9146FF, 0 4px #4d2688, 2px 0 #4d2688, 0 -2px #9146FF;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 8px;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;
  }

  .challengeList {
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    border-bottom-right-radius: 8px;
    padding-left: 4px;
    padding-right: 4px;
  }
  .challengeList > h1 {
    font-family: "Source Code Pro", sans-serif;
    font-size: 32px;
    vertical-align: center;
    position: relative;
    display: block;
    height: 56px;
    padding: 4px;
    color: white;
    text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;

    z-index: 1000;
  }
</style>
