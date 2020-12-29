import { writable } from 'svelte/store';

export let testingMode = writable(false);
export let jsonStoreURL = 'https://script.google.com/macros/s/AKfycbxZhCrh-ZbOu8HT6KfrbZFiaSd5-DdTZeJk26NS7Soa9kqvrA/exec';
export let thisWeek = [
	{ "num": "000", "lang": "ch" }
];
