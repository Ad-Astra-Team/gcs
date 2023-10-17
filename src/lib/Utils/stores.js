import { writable } from 'svelte/store';


// communication 
export const leftNavActive = writable(false);
export const rightleftNavActive = writable(false);
export const heartbeat = writable(false);
export const last_heartbeat = writable(0);


// vehicle properties

export const batteryLevel = writable(0.0);