<template>
    <div class="intros">
        <Btn class="left" @click="leftPage" img="/assets/img/arrow-left.svg" />
        <div class="mid">
            <div class="item" v-for="item in arr">
                <Intro class="intro" :character="item.name"></Intro>
            </div>
        </div>
        <Btn class="right" @click="rightPage" img="/assets/img/arrow-right.svg" />
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import Btn from './Btn.vue';
import Intro from './Intro.vue';
import { gsap } from 'gsap';

var arr = ref([
    { name: "MERLIN"},
    { name: "PERCIVAL"},
    { name: "ASSASSIN"},
    { name: "MORDRED"},
    { name: "OBERON"},
    { name: "MORGANA"},
    { name: "LOYALIST"},
    { name: "MINIONS"},
    { name: "FAIRY"},
]);

var page: Ref<boolean> = ref(false);
var pageNum: Ref<number> = ref(1);

function pageComplete() {
    page.value = false;
}

const leftPage = () => {
    if(page.value == false) {
        if(pageNum.value == 3) {
            page.value = true;
            pageNum.value--;
            gsap.to(".item", {
                left: "-102.62%",
                duration: 0.5,
                onComplete: pageComplete
            })
        }
        else if(pageNum.value == 2) {
            page.value = true;
            pageNum.value--;
            gsap.to(".item", {
                left: "0%",
                duration: 0.5,
                onComplete: pageComplete
            })
        }
    }
    
};
const rightPage = () => {
    if(page.value == false) {
        if(pageNum.value == 1) {
            page.value = true;
            pageNum.value++;
            gsap.to(".item", {
                left: "-102.62%",
                duration: 0.5,
                onComplete: pageComplete
            })
        }
        else if(pageNum.value == 2) {
            page.value = true;
            pageNum.value++;
            gsap.to(".item", {
                left: "-205.25%",
                duration: 0.5,
                onComplete: pageComplete
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.intros {
    position: absolute;
    display: flex;
    align-items: center;
    // border: 2px solid red;
    .left {
        // border: 2px solid red;
        // position: relative;
        width: calc(3/100*var(--width));
        height: calc(10/100*var(--height));
        // border: 2px solid red;
    }

    .right {
        // border: 2px solid red;
        // position: relative;
        width: calc(3/100*var(--width));
        height: calc(10/100*var(--height));
        // border: 2px solid red;
    }
    .mid {
        width: calc(84/100*var(--width));
        height: calc(80/100*var(--height));
        // border: 2px solid green;
        position: relative;
        display: inline-block;
        overflow: scroll;
        // overflow-y: hidden;
        white-space: nowrap;
        margin-inline: calc(4/100*var(--width));
    }
    .item {
        position: relative;
        // left: -102.62%;
        // left: -205.25%;
        display: inline-block;
        margin-inline: calc(4/100*var(--width));
        white-space: normal;
    }
    .intro {
        position: relative;
        width: calc(18/100*var(--width));
        height: calc(80/100*var(--height));
    }
}
</style>