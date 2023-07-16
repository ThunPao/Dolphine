<script>
    import {termm} from "../services/topup.js";
</script>
<!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="topup.showModal()">open modals</button>
<dialog id="topup" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <input type="text" id="voucherurl" placeholder="ลิงค์ซองของขวัญ" class="input input-bordered w-full max-w-xs" />

    <div class="modal-action">
        <button class="btn btn-success">Test</button>
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn" onclick={termm()}>Close</button>
    </div>
  </form>
</dialog>