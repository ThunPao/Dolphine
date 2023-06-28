<script>
  export let did;
  export let title;
</script>

<button
  class="btn btn-primary hover:scale-105 text-lg"
  onclick="{'buyi_' + did}.showModal();"
  ><i class="fa-solid fa-dollar-sign" />
  ซื้อเลย</button
>
<dialog id={"buyi_" + did} class="modal">
  <form method="dialog" class="modal-box" />
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">ยืนยันการซื้อ</h3>
    <p class="py-4">ซื้อ {title} ตอนนี้เลยหรือไม่?</p>
    <div class="modal-action">
      <button class="btn btn-success" on:click={() => console.log("TRIGGERED")}
        >ซื้อทันที</button
      >
      <button class="btn btn-warning">ยกเลิก</button>
    </div>
  </form>
</dialog>
