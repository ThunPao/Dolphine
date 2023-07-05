<!-- Open the modal using ID.showModal() method -->
<dialog id="loginuser_pop" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg text-center">ระบบสมาชิก</h3>

    <div
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
    </div>
    <div class="grid gap-3 justify-center text-center">
      <h1 class="font-bold text-4xl">Dolphine</h1>
      <h4>เข้าสู่ระบบ</h4>
      <input
        type="text"
        placeholder="กรอกชื่อในเกมส์"
        class="input w-full max-w-xs"
      />
      <div class="container mx-auto" />
      <input
        type="text"
        placeholder="กรอกรหัสผ่าน"
        class="input w-full max-w-xs"
      />
      <button class="btn">LOG-IN</button>
    </div>

    <!-- <p class="py-4">กดปุ่ม <kbd class="kbd">ESC</kbd> เพื่อปิด</p> -->
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
