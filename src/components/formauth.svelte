<script>
  import { handleLogin, password } from "../services/Authen";
  password.set("");
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="loginuser_pop" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <!-- <div
      class="hidden gallery flex gap-4 items-center snap-x snap-mandatory overflow-x-scroll"
    >
      <div class="gallery__item min-w-[75%] snap-center">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
      <div class="snap-center gallery__item min-w-[75%]">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
      <div class="gallery__item min-w-[75%] snap-center">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
    </div> -->
    <div class="grid gap-3 justify-center text-center">
      <p class="font-bold text-4xl">Dolphine</p>
      <p class="font-bold text-lg text-center">ระบบสมาชิก / เข้าสู่ระบบ</p>
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
          bind:value={$password}
        />

        <button title="คลิก" class="btn btn-info" on:click={handleLogin}
          >เข้าสู่ระบบ</button
        >
        <p class="mt-2">ยังไม่ได้สมัคร?</p>
        <button
          title="คลิก"
          class="font-bold dark:text-amber-100 text-secondary text-lg"
          onclick="reguser_pop.showModal()">สมัครสมาชิก</button
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
