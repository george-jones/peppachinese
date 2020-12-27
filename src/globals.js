import { writable } from 'svelte/store';

export let testingMode = writable(true);
export let stepSummaries = writable({ });
export let thisWeek = [
	{ "num": "000", "lang": "en" },
	{ "num": "000", "lang": "ch" }
];