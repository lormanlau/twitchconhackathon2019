<template>

</template>

<script>
  import * as robot from 'robotjs';

  export default {
    name: 'RandomClick',
    created() {
      robot.setMouseDelay(2);
    },
  };
</script>

<style scoped>

</style>
