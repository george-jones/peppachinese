import { writable } from 'svelte/store';

export let testingMode = writable(true);
export let stepSummaries = writable({ });
