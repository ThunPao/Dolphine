<script>
  import toastr from "toastr";
  import { currentuser, notlogin } from "../services/Authen";

  export let did;
  export let title;
  export let point;

  async function handleClick() {
    // Display an info toast with no title
    toastr.success(
      "Success!",
      "ซื้อสินค้า " + title + " สำเร็จ ยอดเงินคงเหลือ " + point,
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
  <form class="modal-box" />
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-2xl">ยืนยันการซื้อ</h3>
    <h4>
      DP คงเหลือ หลังจากซื้อ :
      <!-- ({$currentuser?.points} -
      <span class=" text-amber-500">{point}</span>) = -->
      <span
        class="font-bold {$currentuser?.points - point >= 0
          ? 'text-amber-200'
          : 'text-red-500'}"
        >{$currentuser?.points - point >= 0
          ? $currentuser?.points - point
          : "ไม่พอ"}</span
      >
    </h4>
    <p class="py-4 dark:text-amber-100 text-blue-950 text-xl">
      ซื้อ {title} ในราคา
      <span class="dark:text-white text-black font-bold text-lg"
        >{point} DP</span
      > ตอนนี้เลยหรือไม่?
    </p>
    <div class="modal-body" />
    <div class="modal-action">
      {#if $currentuser}
        <button
          class="btn {$currentuser?.points - point < 0
            ? 'btn-warning'
            : 'btn-success'}"
          on:click={() => {
            $currentuser?.points - point < 0 ? "" : handleClick();
          }}
          >{$currentuser?.points - point < 0 ? "DP ไม่พอ" : "ซื้อทันที"}</button
        >
      {:else}
        <button class="btn btn-success" onclick="loginuser_pop.showModal()"
          >กรุณาล็อคอิน</button
        >
      {/if}
      <button class="btn btn-base-200">ยกเลิก</button>
    </div>
  </form>
</dialog>
