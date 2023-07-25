<script>
  import { currentuser, notlogin } from "../services/Authen";
  import { onMount } from "svelte";
  import { buyitem } from "../services/ShopController";

  export let did;
  export let title;
  export let point;
  export let limits;

  let platform = "";

  onMount(() => {
    if (navigator && navigator.userAgent) {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("win")) {
        platform = "Windows";
      } else if (userAgent.includes("linux")) {
        platform = "Linux";
      } else if (userAgent.includes("mac")) {
        platform = "macOS";
      } else {
        platform = "Unknown";
      }
    } else {
      platform = "Unknown";
    }
  });
</script>

{#if limits > 0 || limits < 0}
  <button
    title="คลิก"
    class="btn btn-primary hover:scale-105 text-lg"
    onclick="{'buyi_' + did}.showModal();"
    ><i class="fa-solid fa-dollar-sign" />
    ซื้อเลย</button
  >
{:else if limits <= 0}
  <button title="คลิก" class="btn btn-warning hover:scale-105 text-lg">
    สินค้าหมด</button
  >
{/if}

<dialog id={"buyi_" + did} class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box text-center">
    <h3 class="font-bold text-2xl text-cyan-400 dark:text-cyan-200">
      ยืนยันการซื้อ
    </h3>
    <p class="py-4 dark:text-yellow-200 text-cyan-950 text-xl font-medium">
      ซื้อ
      <span class="dark:text-white text-black font-bold">{title}</span><br />
      ในราคา
      <span class="dark:text-white text-black font-bold text-lg"
        >{point} DP</span
      > <br />ตอนนี้เลยหรือไม่?
    </p>
    <h4 class="badge badge-base-200 p-3">
      DP คงเหลือ หลังจากซื้อ :&nbsp;
      <span
        class="font-bold {$currentuser?.points - point >= 0
          ? 'text-amber-400'
          : 'text-red-500 animate-pulse'}"
        >{$currentuser?.points - point >= 0
          ? $currentuser?.points - point
          : "ไม่พอ"}</span
      >
    </h4>
    <div class="modal-action justify-center">
      {#if $currentuser}
        <button
          title="คลิก"
          class="btn text-xl {$currentuser?.points - point < 0
            ? 'btn-warning'
            : 'btn-success'}"
          on:click={() => {
            $currentuser?.points - point < 0 ? "" : buyitem(did);
          }}>{$currentuser?.points - point < 0 ? "DP ไม่พอ" : "ตกลง"}</button
        >
      {:else}
        <button
          title="คลิก"
          class="btn btn-success"
          onclick="loginuser_pop.showModal()">กรุณาล็อคอิน</button
        >
      {/if}
      <button title="คลิก" class="btn btn-base-200 text-xl">ยกเลิก</button>
    </div>
    {#if platform !== "Unknown"}
      กดปุ่ม<kbd class="kbd kbd-sm mt-2 animate-bounce">Enter</kbd> เพื่อซื้อทันที
    {/if}
  </form>
</dialog>
