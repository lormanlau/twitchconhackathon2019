<template>
  <div></div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'Circles',
    props: {
      intensity: {
        default: 10,
      },
      greyscale: {
        default: false,
      },
    },
    created() {
    },
    mounted() {
      this.svg = d3.select(document.getElementById('svg'));

      this.loopID = setInterval(() => {
        this.make_it_rain(1);
      }, Math.round(500 / (this.intensity / 10)));
    },
    methods: {
      make_it_rain(numDrops) {
        // console.log('Making it rain');
        for (let i = 0; i < numDrops; i += 1) {
          let size = 50 * Math.random();
          size += 50;
          let duration = 250 * Math.random();
          duration += 750;
          const xPos = window.innerWidth * Math.random();
          const yPos = window.innerHeight * Math.random();
          this.raindrop(size, duration, xPos, yPos);
        }
      },

      raindrop(size, duration, xPos, yPos) {
        const fill = this.greyscale ? `hsv(0,0,${Math.random() * 80}%)` : `hsl(${Math.random() * 360},100%,50%)`;
        const drop = this.svg.append('circle')
          .attr('cx', xPos)
          .attr('cy', yPos)
          .attr('r', 0)
          .attr('stroke', 'black')
          .attr('stroke-width', 5)
          // .attr('fill', '#5FC3E4')
          .style('fill', fill)
          // .attr('fill', 'none')
          .attr('opacity', 1);

        drop.transition()
          .duration(duration)
          .attr('r', size)
          // .attr('stroke-width', 0)
          // .attr('opacity', 0.5)
          .ease(Math.sqrt)
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
