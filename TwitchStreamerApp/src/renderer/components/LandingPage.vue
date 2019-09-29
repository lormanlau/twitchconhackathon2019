<template>
  <div class="landing row m-auto">
    <div
        class="m-auto">
      <img
          class="center rs"
          src="../../../static/twitch_logo.svg"
          style="max-width: 30%">
      <br>
      <img
          class="center rs"
          src="https://fontmeme.com/permalink/190929/829841c3d7c405fbe0cff9aa0f673f0c.png"
          alt="twitch-logo-font"
          style="max-width: 60%"
          border="0">
    <br>
    </div>
    <div style="display:inline-block; width: 100%">
      <div
          class="m-auto"
          style="float: left; width: 50%">
        <div>
          <label for="username">Username</label>
          <input :model="username" id="username" placeholder="Enter your Twitch display name">
        </div>
      </div>

      <div
          class="m-auto"
          style="float: right; width: 40%">
        <div style="float: left">
          <label for="intensity">Effect intensity (from 1 to 20)</label>
          <input
              :model="intensity"
              type="number"
              id="intensity"
              min="1"
              max="20"
              placeholder="10">
        </div>
      </div>
    </div>
    <br>
    <div
        class="mx-auto"
        style="display:inline-block">
      <label
          for="exampleCheck1"
          style="display:inline-block">Greyscale the colors</label>
      <input
          :model="greyscale"
          type="checkbox"
          id="exampleCheck1"
          style="display:inline-block">
    </div>
    <br>
    <button
        class="mx-auto"
        style="display:block"
        @click="finish">Finish Configuration</button>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: 'landing-page',
    data() {
      return {
        greyscale: false,
        intensity: 10,
        username: '',
      };
    },
    methods: {
      finish() {
        console.log('clicked');
        if (this.username.length > 0) {
          this.$emit('finish', {
            greyscale: this.greyscale,
            intensity: this.intensity,
            username: this.username,
          });
        }
      },
    },
  };
</script>

<style>
  input:not([type='checkbox']) {
    width: 100%;
    font-size: 20px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 8px;
    text-shadow: none;
  }
  input:not([type='checkbox']):hover {
    border: 2px solid #9146FF;
  }
  input:not([type='checkbox']):focus {
    box-shadow: none;
    border: 2px solid #4d2688;
    outline: none;
  }
  input:focus {
    outline: none;
  }

  button {
    margin-left: auto;
    margin-right: auto;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: 8px;
    text-shadow: none;
    box-shadow: none;
    color: white;
    border: none;
    background-color: #9146FF;
    transition: .5s;
  }

  button:hover {
    background-color: #6f32b8;
  }
  button:focus {
    outline: none;
    box-shadow: 0 2px 2px #6f32b8;
    border: none;
  }

  .landing {
    width: 60vw;
    height: 80vh;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 40px;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 4px solid #4d2688;
    border-radius: 8px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, .5);
  }
  img.rs {
    height: auto;
  }
  img.center {
    display: block;
    margin: 0 auto;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
</style>
