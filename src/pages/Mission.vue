<template>
	<div class="mission">
		<img :src="`/assets/img/play/play_bg.png`" class="mission_bg"/>
		<div class="mission_picture"></div>
		<div class="mission_voters">
			<div v-for="item in List" class="mission_voter">
				<Avatar v-if="item.index===self.index" class="myavatar" :character="item.avatar?item.avatar:'empty'"></Avatar>
				<Avatar v-else class="avatar" :character="item.avatar"></Avatar>
				<div class="name">{{item.name}}</div>
				<div v-if="Room.isVoting">
					<img :src="`/assets/img/thinking.png`" v-if="!item.voted" class="mission_voted"/>
					<img :src="`/assets/img/check.png`" v-else class="mission_voted"/>
				</div>
			</div>
		</div>
		<div class="mission_progressbar">
			<div class="span"></div>
		</div>
		<div class="mission_text" @click="nextText">
			<div class="text">{{ missions[Room.currentRound][textNum] }}</div>
			<img :src="`/assets/img/mission/next.png`" class="next"/>
		</div>
		<div v-if="(Room.isVoting && self.inTeam && !self.voted)" class="mission_vote_bottons">
			<GenshinBtn class="mission_vote_botton" @click="voteMission(true)" content="投票同意" theme="light" type="o"></GenshinBtn>
			<GenshinBtn class="mission_vote_botton" @click="voteMission(false)" content="投票反对" theme="light" type="x"></GenshinBtn>
		</div>
		<!-- <Chat class="chat"></Chat> -->
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { PublicPlayerDef } from '../../shared/ModelDefs';
import Avatar from '../components/Avatar.vue';
import Chat from '../components/Chat.vue';
import GenshinBtn from '../components/GenshinBtn.vue';
import { players, Room, self } from '../reactivity/game';
import { socket } from '../socket';
import { gsap } from 'gsap';

const textNum: Ref<number> = ref(0);

onMounted(() => {
	gsap.fromTo(".text", {
		width: 0,
	}, {
		width: "100%",
		duration: 3
	})
	gsap.fromTo(".span", {
		width: "100%",
	}, {
		width: 0,
		duration: 30,
	})
})
const missions = [
	["穿越烟帷与暗林", "「烟香纱帷一朝落，世间不复你与我。」", "须弥城坐落在雨林之间，被古树与水泽环绕。", 
		"由此向西行进，则将步入尘沙的领域。", "其间种种秘密，皆藏于细雨与飞沙之中。"],
	["千朵玫瑰带来的黎明", "「纵使梦醒时分有玫瑰千朵，可昨日之蔷薇已无处寻。」", "在山峦采撷映满眼帘的绿意，",
		"在平野细嗅随处可见的蔷薇。", "色彩瑰丽的小鸟在黎明欢笑，", "笑声中吐露沉寂百年的智慧。"],
	["迷梦与空幻与欺骗", "「世界现状，环宇的一切——都是迷梦、空幻与欺骗。」"],
	["赤土之王与三朝圣者", "「我乃赤土之王，功业盖世，诸强折服！」", "曾经号令砂砾的王被沙土掩埋，",
		"曾经隔断砂砾的壁被沙土冲刷。", "如今，沉匿的古迹即将迎接新的来客…", "并为他们呈现，古旧的真相。",
		"大赤沙海的遗迹壮阔绝伦，古老的文明令人心驰神往，甚至被寄托诸多愿景。", "然而从中挖掘出的真相，却并不似众人所想…"],
	["虚空鼓动，劫火高扬", "「树王骨血，草神肝心。圣哉！圣哉！圣哉！大善大义，应顶礼，应唱赞，应高颂，应记写。彼日虚空不转，劫灰落定，往事成书。」",
		"汇聚教令院六大学派之力的秘密项目，即将抵达最关键的尾声。", "耗费了如此多的成本、时间与精力，定能有所收获。",
		"但结果是否如其所愿，则未必掌握在他们的手中…"]
];

let List = computed(()=>{
	let copyedList : PublicPlayerDef[] = [];
	for(let x of players.value){
		if(x.inTeam){
			copyedList.push(x);
		}
	}
	return copyedList;
})

function nextText() {
	if(textNum.value < missions[Room.value.currentRound].length - 1) {
		textNum.value++;
		gsap.fromTo(".text", {
			width: 0,
		}, {
			width: "100%",
			duration: 3
		})
		gsap.fromTo(".span", {
			width: "100%",
		}, {
			width: 0,
			duration: 30,
		})
	}
	
}

function voteMission(res : boolean){
	socket.send({
		type: "playerConductMission",
		perform: res,
	})
}
</script>

<style lang="scss" scoped>
.mission{
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	.mission_picture{
		position: relative;
		z-index: 4;
		height: calc(40/100*var(--height));
		width: calc(40/100*var(--width));
		bottom: calc(20/100*var(--height));
		border: 3px solid rgba($color: #BBBBBB, $alpha: 0.35);
	}
	.mission_text{
		position: relative;
		z-index: 4;
		height: calc(20/100*var(--height));
		width: calc(82/100*var(--width));
		bottom: calc(5/100*var(--height));
		background-color: rgba($color: #101010, $alpha: 0.12);
		border: 3px solid rgba($color: #BBBBBB, $alpha: 0.35);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		.text{
			position: absolute;
			height: calc(5/100*var(--height));
			font-size: calc(4/100*var(--height));
			letter-spacing: calc(8/1000*var(--height));
			left: calc(3/100*var(--width));
			bottom: calc(10/100*var(--height));
			color: blanchedalmond;
			overflow: hidden;
		}
		.next{
			position: absolute;
			z-index: 5;
			bottom: 0;
			width: 3.5%;
		}
	}
	.mission_progressbar{
		position: relative;
		z-index: 4;
		height: calc(1/100*var(--height));
		width: calc(50/100*var(--width));
		bottom: calc(10/100*var(--height));
		background-color: #BBBBBB;
		.span{
			position: relative;
			height: 100%;
			width: 60%;
			background-color: #D9A359;
		}
	}
	.mission_vote_bottons{
		position: absolute;
		z-index: 5;
		height: calc(10/100*var(--height));
		width: calc(15/100*var(--width));
		bottom: calc(27/100*var(--height));
		right: calc(3/100*var(--width));
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.mission_vote_botton{
			width: 100%;
			height: 40%;
			position: relative;
			font-size: calc(2/100*var(--height));
		}
	}
	.mission_bg {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1;
		top: 0px;
		left: 0px;
	}
	.chat{
		right: calc(1/100*var(--width));
		top: calc(1/100*var(--height));
		position: absolute;
		width: calc(35/100*var(--width));
		height: calc(45/100*var(--height));
		z-index: 2;
	}
	.mission_voters{
		position: relative;
		width: calc(70/100*var(--width));
		height: calc(15/100*var(--height));
		bottom: calc(15/100*var(--height));
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		z-index: 5;
		.mission_voter{
			height: 100%;
			width: calc(10/100*var(--width));
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			.mission_voted{
				position: absolute;
				right: calc(-20/1000*var(--width));
				top: calc(-15/1000*var(--width));
				width: calc(3/100*var(--width));
			}
			.avatar ,.myavatar{
				position: relative;
				width: 80%;
				border-radius: 50%;
			}
			.myavatar{
				z-index: 5;
			}
			.myavatar+ .name{
				color:gold;
			}
			.name{
				color: white;
				font-size: calc(16/1000*var(--width));
			}
		}
	}
}
</style>