<template>
  <div class="rule-content" v-show="show">
    <!-- <span class="content" v-html="content"></span> -->
    <p class="content">
      游戏规则
      <br/><br/>
      游戏分为教令院阵营和旅行者阵营，双方将共同完成五轮任务，并在任务中完成各自阵营的目标。教令院的任务目标是创造新神，旅行者阵营则致力于阻止教令院的造神计划。
    </p>
    <Btn class="return" @click="hideRule" type="Rule" content="返回" />
    <div class="rule_background"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Btn from "./Btn.vue";
import { gsap } from "gsap";

var show = ref(false);

const props = defineProps({
  content: String,
})

const showRule = () => {
  show.value = true;
  gsap.fromTo(".rule-content", {
    opacity: 0,
    scale: 0.8,
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
  });
}

const hideRule = () => {
  gsap.fromTo(".rule-content", {
    opacity: 1,
    scale: 1,
  }, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    onComplete() {
      show.value = false;
    }
  });
}

defineExpose({ showRule })
</script>

<style lang="scss" scoped>
.rule-content {
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  word-break: break-word;
  background-image: url("/assets/img/ruler/ruler_border.png");
  background-size: 100% 100%;
  z-index: 9999;
  position: fixed;
  width: calc(75/100*var(--height)*2048/1080);
  height: calc(75/100*var(--height));
  top: 50vh;
  margin-top: calc(-75/200*var(--height));
  margin-left: calc(-75/200*var(--height)*2048/1080);
  left: 50vw;

  .content {
    position: absolute;
    width: 85%;
    height: 85%;
    font-size: calc(45/1000*var(--height));
    letter-spacing: calc(5/1000*var(--height));
    color: white;
    top: calc(0.2*var(--height));
    text-align: center;
    z-index: 9999;
    overflow-y: auto;
  }

  .rule_background {
    position: fixed;
    z-index: 999;
    background: none;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
  }

  .return {
    position: absolute;
    width: calc(1/16*var(--width));
    height: calc(1/16*var(--height));
    margin-bottom: 1em;
    font-size: calc(30/1000*var(--height));
    bottom: 0px;
    padding: 1em;
    cursor: pointer;
    color: #5A8375;
    z-index: 9999;
  }
}
</style>
