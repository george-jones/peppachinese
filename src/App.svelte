<style>
#content {
	background-color: #548ac4;
	padding: 15px;
}

#content li {
	cursor: pointer;
}

#content li:hover {
	text-decoration: underline;
	text-decoration-color: #777;
}

#testingMode {
	position: fixed;
	left: 0px;
	bottom: 0px;
	font-size: 14px;
	background-color: #ff5;
	color: #000;
	padding: 3px;
	border-radius: 3px;
}

</style>

<script>
	const { ipcRenderer } = require('electron');

	import Week from './components/Week.svelte';
	import Video from './components/Video.svelte';
	import { weeks } from './weeks.js';
	import { testingMode } from './globals.js';
	
	let weekName;

	function loadWeek (evt) {
		weekName = evt.currentTarget.getAttribute('data-week');
	}

	ipcRenderer.on('toggletestmode', (event, message) => {
		testingMode.update(function (v) {
			return !v;
		});
	});
</script>

<svelte:head>
	<title>Peppa Pig Chinese</title>
</svelte:head>

<div id="content">
	<Video num="000" name="ch" />
</div>

{#if $testingMode}
	<div id="testingMode">Testing Mode</div>
{/if}