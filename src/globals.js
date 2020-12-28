import { writable } from 'svelte/store';

export let testingMode = writable(true);
export let jsonStoreURL = 'https://us-central1-glomination.cloudfunctions.net/json-store';
export let thisWeek = [
	//{ "num": "000", "lang": "en" },
	{ "num": "000", "lang": "ch" }
];
