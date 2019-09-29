<template>
  <div class="landing row m-auto">
    <div
        class="col-8 m-auto">
      <img
          class="center"
          src="../../../static/twitch_logo.svg">
      <br>
      <img
          class="center"
          src="https://fontmeme.com/permalink/190929/829841c3d7c405fbe0cff9aa0f673f0c.png"
          alt="twitch-logo-font"
          border="0">
    </div>
    <div class="col-4 m-auto">
      <form style="width:80%">
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" id="username" placeholder="Enter your Twitch display name">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button
            class="btn btn-primary"
            @click="$emit('finish')">Finish Configuration</button>
      </form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  export default {
    name: 'landing-page',
    data() {
      return {
      };
    },
    created() {
    },
    mounted() {

    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    destroyed() {
    },
  };
</script>

<style>
  .landing {
    width: 80vw;
    height: 80vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 4px gainsboro;
    border-radius: 8px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .5);
  }
  img.center {
    display: block;
    margin: 0 auto;
  }
</style>
