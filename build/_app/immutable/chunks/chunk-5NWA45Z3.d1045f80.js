var D=Object.defineProperty,l=(e,t)=>{for(var r in t)D(e,r,{get:t[r],enumerable:!0})},O={};l(O,{convertFileSrc:()=>w,invoke:()=>_,transformCallback:()=>u});function W(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function u(e,t=!1){let r=W(),n=`_${r}`;return Object.defineProperty(window,n,{value:a=>(t&&Reflect.deleteProperty(window,n),e==null?void 0:e(a)),writable:!1,configurable:!0}),r}async function _(e,t={}){return new Promise((r,n)=>{let a=u(i=>{r(i),Reflect.deleteProperty(window,`_${c}`)},!0),c=u(i=>{n(i),Reflect.deleteProperty(window,`_${a}`)},!0);window.__TAURI_IPC__({cmd:e,callback:a,error:c,...t})})}function w(e,t="asset"){return window.__TAURI__.convertFileSrc(e,t)}async function o(e){return _("tauri",e)}var f={};l(f,{TauriEvent:()=>E,emit:()=>N,listen:()=>y,once:()=>A});async function d(e,t){return o({__tauriModule:"Event",message:{cmd:"unlisten",event:e,eventId:t}})}async function v(e,t,r){await o({__tauriModule:"Event",message:{cmd:"emit",event:e,windowLabel:t,payload:r}})}async function s(e,t,r){return o({__tauriModule:"Event",message:{cmd:"listen",event:e,windowLabel:t,handler:u(r)}}).then(n=>async()=>d(e,n))}async function I(e,t,r){return s(e,t,n=>{r(n),d(e,n.id).catch(()=>{})})}var E=(e=>(e.WINDOW_RESIZED="tauri://resize",e.WINDOW_MOVED="tauri://move",e.WINDOW_CLOSE_REQUESTED="tauri://close-requested",e.WINDOW_CREATED="tauri://window-created",e.WINDOW_DESTROYED="tauri://destroyed",e.WINDOW_FOCUS="tauri://focus",e.WINDOW_BLUR="tauri://blur",e.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",e.WINDOW_THEME_CHANGED="tauri://theme-changed",e.WINDOW_FILE_DROP="tauri://file-drop",e.WINDOW_FILE_DROP_HOVER="tauri://file-drop-hover",e.WINDOW_FILE_DROP_CANCELLED="tauri://file-drop-cancelled",e.MENU="tauri://menu",e.CHECK_UPDATE="tauri://update",e.UPDATE_AVAILABLE="tauri://update-available",e.INSTALL_UPDATE="tauri://update-install",e.STATUS_UPDATE="tauri://update-status",e.DOWNLOAD_PROGRESS="tauri://update-download-progress",e))(E||{});async function y(e,t){return s(e,null,t)}async function A(e,t){return I(e,null,t)}async function N(e,t){return v(e,void 0,t)}export{N as D,y as E,_,A as a,s as b,o as c,l as e,v as m,u as s,I as u};
