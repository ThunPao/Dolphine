<script>
    import {topup} from "../services/topup.js";
    
</script>

<dialog id="topup" class="modal modal-bottom sm:modal-middle ">
  <form method="dialog" class="modal-box text-center">
    <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
      เติมเงิน
    </h1>
    <h4> ผ่านช่องทาง Truemoney (ระบบซองของขวัญ)</h4>
<div class="p-3">
    <input type="text" id="voucherurl" placeholder="ลิงค์ซองของขวัญ" class="input input-bordered w-full max-w-xs" />
    <div class="justify-center p-3">
      <button class="btn btn-info text-2xl text-white" on:click={topup}>ยืนยันการเติมเงิน</button>

    </div>
  </div>

    <div class="modal-action">
        <button class="btn flex grow">ปิดหน้าต่างนี้</button>

    </div>

  </form>
</dialog>