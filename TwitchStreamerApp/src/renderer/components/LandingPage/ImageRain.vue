<template>
  <div></div>
</template>

<script>
  /* eslint-disable no-console */

  import * as d3 from 'd3';

  export default {
    name: 'ImageRain',
    props: {
      text: {
        type: String,
        default: 'Kappa',
      },
      intensity: {
        default: 10,
      },
      greyscale: {
        default: false,
      },
    },
    mounted() {
      this.svg = d3.select(document.getElementById('svg'));

      this.loopID = setInterval(() => {
        this.make_it_rain(1);
      }, Math.round(1000 / (this.intensity / 10)));
    },
    methods: {
      make_it_rain(numDrops) {
        for (let i = 0; i < numDrops; i += 1) {
          const duration = (250 * Math.random()) + 500;
          const size = (48 * Math.random()) + 64;
          this.raindrop(duration, size);
        }
      },

      raindrop(duration, size) {
        const drop = this.svg
          .append('text')
          .attr('font-size', `${size}px`)
          .attr('color', 'black')
          .attr('style', 'fill:white;fill-opacity:1;stroke:#000000;stroke-width:3px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;')
          .style('font-family', 'dpcomic')
          .text(() => this.text)
          .attr('x', Math.random() * window.innerWidth)
          .attr('y', -10)
          .style('transform', `transform: rotate(-${Math.random * 360}deg);`)
          .attr('opacity', 1);

        drop.transition()
          .duration(duration)
          .attr('y', window.innerHeight)
          .style('transform', `transform: rotate(-${Math.random * 360}deg);`)
          // .attr('stroke-width', 0)
          // .attr('opacity', 0.5)
          .remove();
      },
    },
    destroyed() {
      clearInterval(this.loopID);
    },
  };
</script>

<style scoped>

</style>
