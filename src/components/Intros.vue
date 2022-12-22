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
import { ref } from 'vue';
import Btn from './Btn.vue';
import Intro from './Intro.vue';

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

const leftPage = () => {
    // if (ch1.value === "MORDRED") {
    //     ch1.value = "MERLIN";
    //     ch2.value = "PERCIVAL";
    //     ch3.value = "ASSASSIN";
    // }
    // else if (ch1.value === "LOYALIST") {
    //     ch1.value = "MORDRED";
    //     ch2.value = "OBERON";
    //     ch3.value = "MORGANA";
    // }
};
const rightPage = () => {
    // if (ch1.value === "MERLIN") {
    //     ch1.value = "MORDRED";
    //     ch2.value = "OBERON";
    //     ch3.value = "MORGANA";
    // }
    // else if (ch1.value === "MORDRED") {
    //     ch1.value = "LOYALIST";
    //     ch2.value = "MINIONS";
    //     ch3.value = "FAIRY";
    // }
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
        // width: calc(18/100*var(--width));
        // height: calc(80/100*var(--height));
        // border: 2px solid blue;
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