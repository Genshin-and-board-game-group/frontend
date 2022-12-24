<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import Dialog from "./components/Dialog.vue";
import { WSConnect } from "./reactivity/room";
import { getDom } from "./reactivity/music";

var bgm = ref<HTMLAudioElement>();

onMounted(() => { getDom(bgm); bgm.value?.pause(); })

WSConnect();
</script>

<template>
  <div class="main">
    <audio ref="bgm" :src="`/assets/audio/Whirling of Leaves and Petals.mp3`" autoplay loop></audio>
    <router-view />
    <Dialog></Dialog>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-color: black;
  position: relative;
  width: var(--width);
  height: var(--height);
  top: calc((100vh - var(--height)) / 2);
  margin: auto;
  overflow: hidden;
  /* margin: auto;
  overflow: hidden;
  transform-origin: center center;
  box-sizing: border-box;
  position: relative; */
}
</style>
