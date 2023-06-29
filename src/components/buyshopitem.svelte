<script>
  import toastr from "toastr";
  export let did;
  export let title;

  async function handleClick() {
    // Display an info toast with no title
    toastr.success(
      "Success!",
      "ซื้อสินค้า " + title + " สำเร็จ ยอดเงินคงเหลือ point",
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
    <h3 class="font-bold text-lg">ยืนยันการซื้อ</h3>
    <p class="py-4">ซื้อ {title} ตอนนี้เลยหรือไม่?</p>
    <div class="modal-body" />
    <div class="modal-action">
      <button
        class="btn btn-success"
        on:click={() => {
          handleClick();
        }}>ซื้อทันที</button
      >
      <button class="btn btn-warning">ยกเลิก</button>
    </div>
  </form>
</dialog>
