<template>
    <div class="intro">
        <div class="image">
            <img class="ima" :src="`/assets/tachie/${character.toLowerCase()}.png`" alt="character" />
        </div>
        <div class="name">
            {{ name }}
        </div>
        <p class="text"> {{ text }} </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
    SetableCharacters,
    ChineseNames,
    CharacterIntro,
} from "../../shared/GameDefs";
const props = defineProps({
    character: {
        type: String,
        required: true
    },
})
const name = computed(
    () => ChineseNames[props.character as SetableCharacters]
);
const text = computed(
    () => CharacterIntro[props.character as SetableCharacters]
);
</script>

<style lang="scss" scoped>
.intro {
    display: inline-block;
    position: relative;
    height: 100%;
    width: 25%;
    .image {
        height: 60%;
        display: flex;
        overflow: hidden;
        justify-content: center;

        .ima {
            height: 100%;
            width: auto;
            position: relative;
        }
    }
    .name {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10%;
        margin-block: 5%;
        font-size: calc(16/1000*var(--width));
        color: #5A8375;
        background-image: url("/assets/img/characters_label.png");
        background-size: 100% 100%;
        
    }
    .text {
        height: 20%;
        color: white;
        line-height: 150%;
        font-size: calc(16/1000*var(--width));
        overflow: scroll;
    }
}
</style>