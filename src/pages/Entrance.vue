<template>
  <div id="main-page" ref="flexible_fullscreen" class="main-page">
    <img :src="`/assets/img/loading_bg_puzzle.png`" alt="loading_bg_puzzle" class="loading_bg_puzzle" />
    <img :src="`/assets/img/loading_bg_di2.png`" alt="loading_bg_di2" class="loading_bg_di2" />
    <div v-show="pgy_show">
      <img :src="`/assets/img/loading_pgy2.png`" alt="loading_pgy2" class="loading_pgy2" />
      <img :src="`/assets/img/loading_pgy3.png`" alt="loading_pgy3" class="loading_pgy3" />
      <img :src="`/assets/img/loading_pgy3.png`" alt="loading_pgy3_1" class="loading_pgy3_1" />
      <img :src="`/assets/img/loading_pgy4.png`" alt="loading_pgy4" class="loading_pgy4" />

      <img :src="`/assets/img/minipgy/loading_minipgy.png`" alt="loading_minipgy" class="loading_minipgy" />
      <img :src="`/assets/img/minipgy/loading_minipgyball.png`" alt="loading_minipgyball" class="loading_minipgyball" />
      <img :src="`/assets/img/minipgy/ball_2.png`" alt="ball_2" class="ball_2" />
      <img :src="`/assets/img/minipgy/mini_2.png`" alt="mini_2" class="mini_2" />
      <img :src="`/assets/img/minipgy/ball_2.png`" alt="ball_3" class="ball_3" />
    </div>

    <canvas ref="pm" alt="logo" class="logo" v-show="pm_show"></canvas>
    <div class="title" v-show="title_show">须弥书</div>
    <Btn v-show="(loaded === true)" class="loading_enter" @click="skip" type="Enter" content="点击进入" />
    <div v-show="(loaded === false)" class="loading_percent">{{ percent }}%</div>
  </div>

</template>

<script setup lang="ts">
import Btn from "../components/Btn.vue";
import { skip } from "../reactivity/entrance";
import { onMounted, Ref, ref, watch } from "vue";
import { gsap } from "gsap";
import { createApngPlayer } from "../reactivity/loadApng";
import { loading_bg, loading_img } from "../reactivity/preload";
import Player from "apng-js/types/library/player";

const percent: Ref<number> = ref(0);
const loaded: Ref<boolean> = ref(false);
const pm = ref<HTMLCanvasElement>();
var pm_show: Ref<boolean> = ref(false);
var pgy_show: Ref<boolean> = ref(false);
var title_show: Ref<boolean> = ref(false);
var pm1: Player, pm2: Player, pm3: Player;

loading_bg(pgy_show);
loading_img(percent, loaded);

onMounted(async () => {
  if (pm != null) {
    var canvas = pm.value as HTMLCanvasElement;
    canvas.width = 545;
    canvas.height = 545;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    pm1 = await createApngPlayer("/assets/img/pm1.png", ctx, true);
    pm2 = await createApngPlayer("/assets/img/pm2.png", ctx, false);
    pm3 = await createApngPlayer("/assets/img/pm3.png", ctx, true);
    pm1.play();
    pm_show.value = true;
    pm1.on('end', () => {
      pm2.play();
    });
    pm2.on('frame', () => {
      if (pm2.currentFrameNumber == 5) {
        if (loaded)
          pm2.stop();
      }
    })
    pm2.on('stop', () => {
      pm3.play();
    })
    pm3.on('end', () => {
      pm_show.value = false;
      title_show.value = true;
      gsap.fromTo(".title", {
        opacity: 0.7,
        scale: 0.9,
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
      })
    })
  };
});


</script>

<style lang="scss" scoped>
.main-page {
  .loading_percent {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0.7;
    height: 2em;
    top: calc((2/3*var(--height)));
    width: calc((40/100*var(--height)));
    font-size: calc((4/100*var(--height)));
    color: #746257;
    margin: auto;
    text-align: center;
    z-index: 4;
  }

  .loading_bg_puzzle {
    z-index: 1;
    position: absolute;
    width: 100%;
  }

  .loading_bg_di2 {
    z-index: 2;
    position: absolute;
    width: 100%;
  }

  .loading_pgy2 {
    position: absolute;
    transform-origin: bottom;
    opacity: 1;
    width: calc(10/100*var(--width));
    left: calc(18/100*var(--width));
    top: calc(74/100*var(--height));
    z-index: 2;
  }

  .loading_pgy3 {
    position: absolute;
    // transform-origin: bottom;
    opacity: 0.8;
    width: calc(25/100*var(--width));
    right: calc(4/100*var(--width));
    top: calc(60/100*var(--height));
    z-index: 1;
  }

  .loading_pgy3_1 {
    position: absolute;
    opacity: 0.5;
    width: calc(23/100*var(--width));
    left: calc(23/100*var(--width));
    top: calc(85/100*var(--height));
    z-index: 2;
  }

  .loading_pgy4 {
    position: absolute;
    transform-origin: bottom;
    width: calc(38/100*var(--width));
    left: calc(-8/100*var(--width));
    top: calc(45/100*var(--height));
    z-index: 2;
  }

  .loading_minipgy {
    position: absolute;
    opacity: 0.9;
    width: calc(5/100*var(--width));
    left: calc(1/100*var(--width));
    top: calc(85/100*var(--height));
    z-index: 6;
  }

  .loading_minipgyball {
    position: absolute;
    opacity: 0.7;
    width: calc(7/100*var(--width));
    left: calc(1/100*var(--width));
    top: calc(85/100*var(--height));
    z-index: 6;
  }

  .ball_2 {
    position: absolute;
    opacity: 0.4;
    width: calc(9/100*var(--width));
    left: calc(1/100*var(--width));
    top: calc(85/100*var(--height));
    z-index: 6;
  }

  .ball_3 {
    position: absolute;
    opacity: 0.4;
    width: calc(9/100*var(--width));
    left: calc(25/100*var(--width));
    top: calc(60/100*var(--height));
    z-index: 6;
  }

  .mini_2 {
    position: absolute;
    opacity: 0.5;
    width: calc(6/100*var(--width));
    left: calc(1/100*var(--width));
    top: calc(85/100*var(--height));
    z-index: 6;
  }

  .logo {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    height: calc(1/5*var(--width));
    width: calc(1/5*var(--width));
    top: calc((45/100*var(--height)) / 2);
    z-index: 4;
  }

  .title {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: calc((40/100*var(--height)));
    font-size: calc((1/5*var(--height)) / 2);
    font-weight: bolder;
    letter-spacing: calc((1/35*var(--height)) / 2);
    color: #997A6A;
    z-index: 4;
  }

  .loading_enter {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0.7;
    height: 2em;
    top: calc((2/3*var(--height)));
    width: calc((40/100*var(--height)));
    font-size: calc((5/100*var(--height)));
    color: #997A6A;
    margin: auto;
    text-align: center;
    z-index: 4;
  }
}
</style>
