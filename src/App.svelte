<style>
#content {
	background-color: #548ac4;
	padding: 0;
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

	import Video from './components/Video.svelte';
	import { testingMode } from './globals.js';
	
	let weekName;

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
	<Video />
</div>

{#if $testingMode}
	<div id="testingMode">Testing Mode</div>
{/if}