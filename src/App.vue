<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { RouterView } from "vue-router";
import Dialog from "./components/Dialog.vue";
import { WSConnect } from "./reactivity/room";
import { getDom } from "./reactivity/music";

var bgm = ref<HTMLAudioElement>();
var bgm_play: Ref<boolean> = ref(false);

onMounted(() => { getDom(bgm, bgm_play); bgm.value?.pause(); })

function bgm_change() {
  if(bgm_play.value == true) {
    bgm_play.value = false;
    bgm.value!.pause();
  }
  else {
    bgm_play.value = true;
    bgm.value!.play();
  }
}

WSConnect();
</script>

<template>
  <div class="main">
    <img :src="`/assets/img/bgm_on.png`" class="bgm" v-if="bgm_play" @click="bgm_change"/>
    <img :src="`/assets/img/bgm_off.png`" class="bgm" v-else @click="bgm_change"/>
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
  .bgm {
    cursor: pointer;
    position: absolute;
    z-index: 999;
    right: calc((2/100*var(--width)));
    top: calc((2/100*var(--width)));
    width: calc((4.5/100*var(--width)));
  }
  /* margin: auto;
  overflow: hidden;
  transform-origin: center center;
  box-sizing: border-box;
  position: relative; */
}
</style>
