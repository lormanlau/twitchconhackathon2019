<template>
  <div
      id="wrapper"
      :style="bgStyle">
    <challenges
        v-if="landed"
        :greyscale="greyChallenges"
        :intensity="challengeRatePerTen"
        :username="username"
        @bg="updateBg"/>
    <landing-page
        v-else
        @finish="transitionToWindowless"/>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import LandingPage from './LandingPage';
  import Challenges from './Challenges';

  export default {
    name: 'Main',
    components: { Challenges, LandingPage },
    data() {
      return {
        landed: false,

        greyChallenges: false,
        challengeRatePerTen: 1,
        username: '',
        bgStyle: {
          'background-color': 'rgba(0, 0, 0, 0) !important',
        },
      };
    },
    created() {
      if (this.landed) this.transitionToWindowless({});
    },
    methods: {
      transitionToWindowless({ greyscale, intensity, username }) {
      	this.greyChallenges = greyscale;
      	this.challengeRatePerTen = intensity;
      	this.username = username;
        const mainWindow = remote.getCurrentWindow();
        mainWindow.setVisibleOnAllWorkspaces(true);
        mainWindow.setAlwaysOnTop(true, 'floating', 1);
        mainWindow.setFullScreenable(false);
        mainWindow.setIgnoreMouseEvents(true, { forward: true });
        this.$set(this, 'landed', true);
      },

      updateBg(newColor) {
        this.$set(this.bgStyle, 'background-color', `${newColor} !important`);
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  @font-face {
    font-family: 'dpcomic';
    src: url('../../../static/dpcomic.regular.ttf');
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    overflow: hidden;
  }

  #wrapper {
    /*background:*/
    /*radial-gradient(*/
    /*ellipse at top left,*/
    /*rgba(255, 255, 255, 1) 40%,*/
    /*rgba(229, 229, 229, .9) 100%*/
    /*);*/
    height: 100vh;
    width: 100vw;
  }

  .m-auto {
    margin: auto;
  }
</style>
