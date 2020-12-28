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

#asking.show-results .incorrect {
	background-color: #c46354;
}

#asking.show-results .correct {
	background-color: #54c48e;
}

#done {
	margin-top: 100px;
	font-size: 96px;
	text-align: center;
	background-color: #54c48e;
	border-radius: 30px;
}
</style>

<script>
import { rand } from '../rand.js';
import { pinyinString } from '../pinyin.js';
import { testingMode } from '../globals.js';
import { thisWeek } from '../globals.js';

const fs = require('fs');

let step_num = 0;
let done = true;
let num;
let clips;
let clip_num;
let is_english;
let asking;
let answered;
let video_class;
let full_name;
let audio_src;
let play_text;
let playing;
let err;
let interval_idx;
let vc;
let vid;
let options;
let prompt;
let correct_answer;
let asking_class;
let answers;

function playTextSet() {
	if (playing) {
		play_text = '⏸️';
	} else {
		play_text = '▶️';
	}
}

function ask() {
	let clip = clips[clip_num];
	let fixDisplay;

	asking = true;
	answered = false;
	video_class = 'nocontrol';
	vid.pause();

	if (clip.type == 's') {
		prompt = 'What sound is this?';
		fixDisplay = pinyinString;
	} else if (clip.type == 'm') {
		prompt = 'What does this mean?';
		fixDisplay = function (txt) { return txt; };
	} else {
		err = 'Unrecognized clip type: ' + clip.type;
	}

	// first option is always the right answer
	correct_answer = clip.options[0];
	options = rand.shuffle(clip.options).map(function (option) {
		return {
			"value": option,
			"display": fixDisplay(option),
			"optClass": (option == correct_answer)? "correct": "incorrect"
		}
	});
	audio_src =  num + '/' + clip.filename;
}

function playPauseToggle() {
	if (!vc) {
		vc = this.parentNode.parentNode;
		vid = vc.children[0];
	}

	if (asking) {
		if (answered) {
			clip_num++;
			asking = false;
			asking_class = '';
		} else {
			return;
		}
	}

	playing = !playing;
	playTextSet();

	if (!playing) {
		vid.pause();
		window.clearInterval(interval_idx);
	} else {
		if (!is_english && clips[clip_num]) {
			interval_idx = window.setInterval(function () {
				let current_ms = Math.floor(vid.currentTime * 1000);
				if (current_ms >= clips[clip_num].ask_time) {
					playPauseToggle();
					ask();
				}
			}, 50);
		} else {
			vid.addEventListener('ended', endHandler, false);
		}

		vid.play();
	}
}

function endHandler() {
	step_num++;
	if (step_num >= thisWeek.length) {
		all_done();
	} else {
		setup();
	}
}

function setup() {
	let step = thisWeek[step_num];
	num = step.num;

	clips = [ ];
	clip_num = 13;
	is_english = (step.lang === 'en');
	asking = false;
	answered = false;
	video_class = 'nocontrol';
	full_name = num + '/' + step.lang + '.mp4';
	audio_src = '';
	play_text = '';
	playing = false;
	err = null;
	interval_idx = -1;
	vc;
	vid;
	options = [ ];
	prompt = '';
	correct_answer = '';
	asking_class = '';
	answers = [ ];

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

function all_done() {
	done = true;
}

function playSound() {
	vc.children[1].play();
}

function clickOption() {
	let my_answer = this.getAttribute('optionvalue');
	let a = { };

	asking_class = 'show-results';
	video_class = '';
	answered = true;
	a.correct_answer = correct_answer;
	a.my_answer = my_answer;
	if (correct_answer == my_answer) {
		a.correct = true;
	} else {
		a.correct = false;
	}
	answers.push(a);
}

function jumpToNext() {
	if (clips[clip_num]) {
		vid.currentTime = Math.floor(clips[clip_num].start / 1000);
	}
}

setup();
</script>

{#if done}
	<div id="done">All done!</div>
{:else}
	<div id="video-container" class="{video_class}">
		<video src="{full_name}" width="1024" height="576" />
		<audio id="audio" src="{audio_src}" />
		<span style="position: relative">
			<span class="control-btn" on:click="{playPauseToggle}">{play_text}</span>
		</span>
	</div>

	{#if $testingMode}
	<input type="button" value="Next" on:click="{jumpToNext}">
	{/if}

	{#if asking}
	<div class="center-child">
		<div id="asking" class="{asking_class}">
			<div class="prompt">{prompt} <span id="playSound" on:click="{playSound}">🔊</span></div>
			<ul>
			{#each options as option}
				<li on:click="{clickOption}" class="{option.optClass}" optionvalue="{option.value}">
					{option.display}
				</li>
			{/each}
			</ul>
		</div>
	</div>
	{/if}
{/if}

{#if err}
	<div class="error">{err}</div>
{/if}
