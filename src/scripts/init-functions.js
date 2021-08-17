export let body = $('body');
export let ua = navigator.userAgent;
export let press = (ua.match(/iPad/i)) ? "touchstart" : "click";
