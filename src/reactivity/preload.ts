import { floating_pgy } from "../reactivity/entrance";
import { Ref } from "vue";
export function loading_bg(pgy_show: Ref<boolean>) {
	var preimgUrl: string[] = [
		"/assets/img/loading_bg_puzzle.png",
		"/assets/img/loading_bg_di2.png",
		"/assets/img/loading_pgy2.png",
		"/assets/img/loading_pgy3.png",
		"/assets/img/loading_pgy4.png",
		"/assets/img/minipgy/loading_minipgy.png",
		"/assets/img/minipgy/loading_minipgyball.png",
		"/assets/img/minipgy/ball_2.png",
		"/assets/img/minipgy/mini_2.png",
		"/assets/img/minipgy/ball_2.png",
	];
	let preloadedNum = 0;
	for (let item of preimgUrl) {
		let img = new Image();
		img.src = item;
		img.onload = function () {
			preloadedNum++;
			if (preloadedNum == preimgUrl.length) {
				pgy_show.value = true;
				floating_pgy();
			}
		}
	}
}

export function loading_img(percent: Ref<number>, loaded : Ref<boolean>) {
	const imgModule = import.meta.glob('../../assets/**/*.{png,svg,gif,jpg}', { as: 'url' });
	const imgUrl: string[] = [];
	Object.keys(imgModule).forEach(item => {
		imgUrl.push(item);
	});
	const imgNum = imgUrl.length;
	let loadedNum = 0;
	for (let item of imgUrl) {
		let img = new Image();
		img.src = item;
		img.onload = function () {
			loadedNum++;
			percent.value = Math.floor((loadedNum / imgNum) * 100);
			if (loadedNum === imgNum) {
				loaded.value = true;
			}
		}
	}
}