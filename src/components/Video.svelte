<style>
.center-child {
	width: 100%;
	text-align: center;
}
#video-container {
	width: 100%;
	text-align: center;
}

#video-container.nocontrol .control-btn {
	cursor: not-allowed;
	opacity: 0.15;
}
#asking {
	display: inline-block;
}
#asking .prompt {
	font-size: 34px;
}

#asking ul {
	list-style-type: none;
	padding: 0;
  	margin: 0;
}

#asking li {
	font-size: 32px;
	background-color: #6c97c5;
	border-radius: 4px;
	padding: 4px;
	margin: 2px;
	cursor: pointer;
}

#asking li:hover {
	background-color: #c5c46c;
}

#playSound {
	cursor: pointer;
}

</style>

<script>
import { rand } from '../rand.js';
export let num;

const fs = require('fs');
const path = require('path');

let clips = [ ];
let clip_num = 0;
let is_english = false;
let asking = false;
let video_class = 'nocontrol';
let full_name = num + '/' + (is_english? 'en' : 'ch') + '.mp4';
let audio_src = '';
let play_text = '';
let playing = false;
let err = null;
let interval_idx = -1;
let vc;
let vid;
let options = [ ];
let prompt = '';
let correct_answer = '';

function playTextSet() {
	if (playing) {
		play_text = '⏸️';
	} else {
		play_text = '▶️';
	}
}

function ask() {
	let clip = clips[clip_num];

	asking = true;
	video_class = 'nocontrol';
	vid.pause();

	if (clip.type == 's') {
		prompt = 'What sound is this?';
	} else if (clip.type == 'm') {
		prompt = 'What does this mean?';
	} else {
		err = 'Unrecognized clip type: ' + clip.type;
	}

	// first option is always the right answer
	correct_answer = clip.options[0];
	options = rand.shuffle(clip.options);
	audio_src =  num + '/' + clip.filename;
}

function playPauseToggle() {
	vc = this.parentNode.parentNode;
	vid = vc.children[0];

	if (asking) {
		return;
	}

	playing = !playing;
	playTextSet();

	if (!playing) {
		vid.pause();
		window.clearInterval(interval_idx);
	} else {
		interval_idx = window.setInterval(function () {
			let current_ms = Math.floor(vid.currentTime * 1000);
			if (current_ms >= clips[clip_num].ask_time) {
				clearInterval(interval_idx);
				ask();
			}
		}, 50);
		vid.currentTime = Math.floor(clips[clip_num].start / 1000);
		vid.play();
	}
}

function setup() {
	try {
		let data = fs.readFileSync('public/' + num + '/data.json');
		clips = JSON.parse(data).clips;
		playTextSet();
		video_class = '';
	} catch (ex) {
		err = ex;
		return;
	}
}

function playSound() {
	vc.children[1].play();
}

function clickOption() {
	let answered = this.firstChild.nodeValue;
	if (correct_answer == answered) {
		console.log('yep');
	} else {
		console.log(correct_answer, answered);
	}
}

setup();

</script>
<div id="video-container" class="{video_class}">
	<video src="{full_name}" width="1024" height="576" />
	<audio id="audio" src="{audio_src}" />
	<span style="position: relative">
		<span class="control-btn" on:click="{playPauseToggle}">{play_text}</span>
	</span>
</div>
{#if asking}
<div class="center-child">
	<div id="asking">
		<div class="prompt">{prompt} <span id="playSound" on:click="{playSound}">🔊</span></div>
		<ul>
		{#each options as option}
			<li on:click="{clickOption}">{option}</li>
		{/each}
		</ul>
	</div>
</div>
{/if}

{#if err}
	<div class="error">{err}</div>
{/if}