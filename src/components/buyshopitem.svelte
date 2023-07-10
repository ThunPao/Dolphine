<script>
  import toastr from "toastr";
  import { currentuser, notlogin } from "../services/Authen";
  import { onMount } from "svelte";

  export let did;
  export let title;
  export let point;

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

  async function handleClick() {
    // Display an info toast with no title
    toastr.success(
      "Success!",
      "ซื้อสินค้า " + title + " สำเร็จ ยอดเงินคงเหลือ " + currentuser?.points,
      {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Delayed log after 0.5 seconds");
  }
</script>

<button
  class="btn btn-primary hover:scale-105 text-lg"
  onclick="{'buyi_' + did}.showModal();"
  ><i class="fa-solid fa-dollar-sign" />
  ซื้อเลย</button
>

<dialog id={"buyi_" + did} class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box text-center">
    <h3 class="font-bold text-2xl text-cyan-400 dark:text-cyan-200">
      ยืนยันการซื้อ
    </h3>
    <h4>
      DP คงเหลือ หลังจากซื้อ :
      <!-- ({$currentuser?.points} -
      <span class=" text-amber-500">{point}</span>) = -->
      <span
        class="font-bold {$currentuser?.points - point >= 0
          ? 'text-amber-200'
          : 'text-red-500 animate-pulse'}"
        >{$currentuser?.points - point >= 0
          ? $currentuser?.points - point
          : "ไม่พอ"}</span
      >
    </h4>
    <p class="py-4 dark:text-sky-300 text-cyan-950 text-xl font-medium">
      ซื้อ <span class="dark:text-white text-black font-bold">{title}</span>
      ในราคา
      <span class="dark:text-white text-black font-bold text-lg"
        >{point} DP</span
      > <br />ตอนนี้เลยหรือไม่?
    </p>

    <div class="modal-action justify-center">
      {#if $currentuser}
        <button
          class="btn text-xl {$currentuser?.points - point < 0
            ? 'btn-warning'
            : 'btn-success'}"
          on:click={() => {
            $currentuser?.points - point < 0 ? "" : handleClick();
          }}>{$currentuser?.points - point < 0 ? "DP ไม่พอ" : "ตกลง"}</button
        >
      {:else}
        <button class="btn btn-success" onclick="loginuser_pop.showModal()"
          >กรุณาล็อคอิน</button
        >
      {/if}
      <button class="btn btn-base-200 text-xl">ยกเลิก</button>
    </div>
    {#if platform !== "Unknown"}
      กดปุ่ม<kbd class="kbd kbd-sm mt-2">Enter</kbd> เพื่อซื้อทันที
    {/if}
  </form>
</dialog>
