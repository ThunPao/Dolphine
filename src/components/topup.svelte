<script>
    import {topup} from "../services/topup.js";
    let inputValue = '';
</script>

<dialog id="topup" class="modal modal-bottom sm:modal-middle ">
  <form method="dialog" class="modal-box text-center">
    <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
      เติมเงิน
    </h1>
    <h4> ผ่านช่องทาง Truemoney (ระบบซองของขวัญ)</h4>
<div class="p-3">
    <input type="text" id="voucherurl" placeholder="ลิงค์ซองของขวัญ" class="input input-bordered w-full max-w-xs" on:input={(event) => (inputValue = event.target.value)}/>
    <div class="justify-center p-3">
    
    {#if inputValue.includes('https://gift.truemoney.com') }
      <button class="btn btn-success text-2xl text-white" on:click={topup}>
        ยืนยันการเติมเงิน
      </button>
    {:else}
    <button class="btn btn-disabled text-lg text-red-300">
      กรอกลิงก์ซองของขวัญให้ถูกต้อง
    </button>
  {/if}
</div>

  </div>
    <div class="modal-action">
        <button class="btn flex grow">ปิดหน้าต่างนี้</button>
    </div>

  </form>
</dialog>