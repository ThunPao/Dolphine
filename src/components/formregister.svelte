<script>
  import { handleRegister } from "../services/Authen";
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="reguser_pop" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg text-center">ระบบสมาชิก</h3>
    <div class="grid gap-3 justify-center text-center">
      <h1 class="font-bold text-4xl">Dolphine</h1>
      <h4>สมัครสมาชิก</h4>

      <div class="join grid gap-3">
        <input
          type="text"
          id="username"
          placeholder="ชื่อในเกมส์"
          class="input input-bordered w-full max-w-xs"
        />

        <input
          type="password"
          id="password"
          placeholder="รหัสผ่าน"
          class="input input-bordered w-full max-w-xs"
        />

        <button class="btn btn-accent" on:click={handleRegister}>Register</button>
      </div>
    </div>

    <!-- <p class="py-4">กดปุ่ม <kbd class="kbd">ESC</kbd> เพื่อปิด</p> -->
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
