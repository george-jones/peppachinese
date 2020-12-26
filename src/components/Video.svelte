<style>
#video-container {
	width: 100%;
	text-align: center;
}
</style>

<script>
export let num;
export let name;

let full_name = num + '/' + name + '.mp4';
let play_text = '';
let playing = false;

function playTextSet() {
	if (playing) {
		play_text = '⏸️';
	} else {
		play_text = '▶️';
	}
}

playTextSet();

function playPauseToggle() {
	var vid = this.parentNode.children[0];

	playing = !playing;
	playTextSet();
	
	if (!playing) {
		vid.pause();
	} else {
		vid.play();
	}
}

</script>
<div id="video-container">
	<video src="{full_name}" width="1024" height="576" />
	<span class="control-btn" on:click="{playPauseToggle}">{play_text}</span>
</div>

