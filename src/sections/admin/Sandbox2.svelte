<script lang="ts">
  let items = ["Apple", "Banana", "Orange", "Grapes"];
  let imgurl =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  let value = 0;
  import { getCookie, setCookie } from "@services/cookies";
  let hello = getCookie("auth");
  // import { scale } from "svelte/transition";
  // import { quintOut } from "svelte/easing";
  // import { onMount, tick } from "svelte";

  let expired_date = "2023-12-12T03:20:00.000Z";
</script>

<input
  id="Expiretime"
  type="text"
  placeholder="Select a date and time"
  bind:value={expired_date}
  readonly
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="btn btn-secondary"
  on:click={() => {
    setCookie("auth", "hellowa", 30);
  }}
>
  SET
</div>

THE COOKIE ARE {hello}

<input type="datetime-local" id="birthdaytime" name="birthdaytime" />
