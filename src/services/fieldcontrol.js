import { writable } from "svelte/store";

export let inputValue = writable("");
export function clearinput() {
  inputValue.set("");
}