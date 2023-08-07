<script>
  import {
    handleRegister,
    reguser,
    regpwd,
    regpwdcf,
  } from "../services/Authen";
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="reguser_pop" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <div class="grid gap-3 justify-center text-center">
      <p class="font-bold text-4xl">Dolphine</p>
      <p class="font-bold text-lg text-center">ระบบสมาชิก / สมัครสมาชิก</p>

      <div class="join grid gap-3">
        <input
          type="text"
          id="regusername"
          placeholder="ชื่อในเกมส์"
          class="input input-bordered w-full max-w-xs"
          bind:value={$reguser}
        />

        <input
          type="password"
          id="regpassword"
          placeholder="รหัสผ่าน"
          class="input input-bordered w-full max-w-xs"
          bind:value={$regpwd}
        />

        <input
          type="password"
          id="confirmPassword"
          placeholder="ยืนยันรหัสผ่าน"
          class="input input-bordered w-full max-w-xs"
          bind:value={$regpwdcf}
        />

        <button
          title="คลิก"
          class="btn btn-accent"
          on:click={() => handleRegister()}>สมัครสมาชิก</button
        >
      </div>
    </div>

    <!-- <p class="py-4">กดปุ่ม <kbd class="kbd">ESC</kbd> เพื่อปิด</p> -->
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button title="คลิก" class="btn flex grow">ปิดหน้าต่างนี้</button>
    </div>
  </form>
</dialog>
