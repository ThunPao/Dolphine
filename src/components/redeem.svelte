<script>
  import { redeem } from "../services/topup.js";
  import { inputValue } from "../services/fieldcontrol.js";
  inputValue.set("");
  const redeemCodeRegex = /^[A-Za-z0-9]+$/;
</script>

<dialog id="redeem" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box text-center">
    <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
      กรอกโค๊ดรหัส
    </h1>
    <h4>กรอกรหัสแลกรับ</h4>
    <div class="p-3">
      <input
        type="text"
        id="redeemcode"
        placeholder="รหัสแลกรับ"
        class="input input-bordered w-full max-w-xs"
        bind:value={$inputValue}
        on:input={(event) => ($inputValue = event.target.value)}
      />
      <div class="justify-center p-3">
        {#if redeemCodeRegex.test($inputValue) && $inputValue.length > 1}
          <button
            title="คลิก"
            class="btn btn-success text-2xl text-white"
            on:click={redeem}
          >
            ยืนยันการกรอกโค๊ด
          </button>
        {:else}
          <button title="คลิก" class="btn btn-disabled text-lg text-red-300">
            กรอกโค๊ดรหัสแลกรับให้ถูกต้อง
          </button>
        {/if}
      </div>
    </div>
    <div class="modal-action">
      <button title="คลิก" class="btn flex grow">ปิดหน้าต่างนี้</button>
    </div>
  </form>
</dialog>
