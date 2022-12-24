import { Ref, ref } from "vue";

var bgm = ref<HTMLAudioElement>();

export function getDom(_bgm: Ref<HTMLAudioElement | undefined>) {
    bgm = _bgm;
}

export function cutBgm(next: String, round: number) {
    if(next == "wait") {
        bgm.value!.src = "/assets/audio/Whirling of Leaves and Petals.mp3";
    }
    if(next == "play") {
        if(round == 0) bgm.value!.src = "/assets/audio/Languid and Quiet Moment.mp3";
        if(round == 1) bgm.value!.src = "/assets/audio/For Riddles, for Wonders.mp3";
        if(round == 2) bgm.value!.src = "/assets/audio/Halcyon Times.mp3";
        if(round == 3) bgm.value!.src = "/assets/audio/Scorching Outpost.mp3";
        if(round == 4) bgm.value!.src = "/assets/audio/Sanctuary of Surasthana.mp3";
    }
    if(next == "mission") {
        if(round == 0) bgm.value!.src = "/assets/audio/Rhymes of Vales.mp3";
        if(round == 1) bgm.value!.src = "/assets/audio/Swirls of the Stream.mp3";
        if(round == 2) bgm.value!.src = "/assets/audio/Jolts in the Forest.mp3";
        if(round == 3) bgm.value!.src = "/assets/audio/Gilded Runner.mp3";
        if(round == 4) bgm.value!.src = "/assets/audio/Scaramouche 2nd stage.mp3";
    }
}