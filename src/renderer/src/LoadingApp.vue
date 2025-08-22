<template>
    <div id="loading-animation" class="absolute top-0 right-0 bottom-0 left-0">

    </div>
</template>

<script setup lang="ts">
import lottie from "lottie-web";
import { onMounted } from 'vue';

onMounted(() => {
  const animation = lottie.loadAnimation({
    container: document.querySelector("#loading-animation")!, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/loading-animation.json' // the path to the animation json
  });

  animation.play();
});
</script>

<style scoped>

</style>
