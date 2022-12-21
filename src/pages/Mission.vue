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
		<div class="mission_progressbar"></div>
		<div class="mission_text">
			<div class="text">{{ missions[Room.currentRound] }}</div>
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
import { computed, onMounted } from 'vue';
import { PublicPlayerDef } from '../../shared/ModelDefs';
import Avatar from '../components/Avatar.vue';
import Chat from '../components/Chat.vue';
import GenshinBtn from '../components/GenshinBtn.vue';
import { players, Room, self } from '../reactivity/game';
import { socket } from '../socket';
import { gsap } from 'gsap';

onMounted(() => {
	gsap.fromTo(".text", {
		opacity: 0,
	}, {
		opacity: 1,
		duration: 3
	})
})

const missions = [
	"穿越烟帷与暗林",
	"千朵玫瑰带来的黎明",
	"迷梦与空幻与欺骗",
	"赤土之王与三朝圣者",
	"虚空鼓动，劫火高扬"
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
			height: calc(5/100*var(--height));
			font-size: calc(4/100*var(--height));
			letter-spacing: calc(1/100*var(--height));
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
		background-color: #D9A359;
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