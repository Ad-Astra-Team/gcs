import { writable } from 'svelte/store';

export const heartbeat = writable(false);
export const last_heartbeat = writable(0);