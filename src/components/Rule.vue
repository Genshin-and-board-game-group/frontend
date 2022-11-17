<template>
  <div class="rule-content" v-show="show">
    <span
      class="content"
      v-html="content"
    ></span>
    <Btn class="return" @click="show = false" type="Rule" content="返回" />
    <div class="rule_background"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Btn from "./Btn.vue";

  var show = ref(false);

  const showRule = () => {
    show.value = true;
  }

  const props = defineProps({
    content: String,
  })

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
    background-image: url("../../public/assets/img/ruler/ruler_border.png");
    background-size: 100% 100%;
    z-index: 9999;
    position: fixed;
    width: calc(70/100*var(--height)*2048/1080);
    height: calc(70/100*var(--height));
    top: 46vh;
    margin-top: calc(-35/100*var(--height));
    left: 15vw;
    .content{
      position: absolute;
      width: calc(1/4*var(--width));
      height: calc(1/16*var(--height));
      font-size: calc(45/1000*var(--height));
      color: #B6AB97;
      top: calc(0.3*var(--height));
      text-align: center;
      z-index: 9999;
      overflow-y: auto;
    }
    .rule_background{
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
<<<<<<< HEAD
      width: calc(12/100*var(--width));
      height: calc(6/100*var(--height));
      margin-bottom: 2em;
=======
      width: calc(1/16*var(--width));
      height: calc(1/16*var(--height));
      margin-bottom: 1em;
>>>>>>> a728968 (Rule)
      font-size: calc(30/1000*var(--height));
      bottom: 0px;
      padding: 1em;
      cursor: pointer;
<<<<<<< HEAD
      color: #5A8375;
=======
      color: #B1BC94;
>>>>>>> a728968 (Rule)
      z-index: 9999;
    }
  }
</style>
