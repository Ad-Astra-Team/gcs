import { writable } from 'svelte/store';

export const leftNavActive = writable(false);
export const rightleftNavActive = writable(false);
export const heartbeat = writable(false);
export const last_heartbeat = writable(0);
