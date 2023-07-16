<script>
  import { logout, tokencheck } from "../services/Authen";

</script>
<dialog id="fast_menu" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-medium text-4xl text-center">เมนู</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
  
      <div class="grid gap-4 grid-cols-2 md:grid-flow-col">
        <a href="/">
          <div class="indicator">
            <span class="indicator-item badge badge-primary">new</span>
            <div class="grid w-32 h-32 bg-base-300 place-items-center">
              <div class="grid grid-rows-2 text-center">
                <i class="fa-solid fa-house fa-2xl" />หน้าหลัก
              </div>
            </div>
          </div>
        </a>
        <div class="indicator">
          <span class="indicator-item badge badge-primary">new</span>
          <div class="grid w-32 h-32 bg-base-300 place-items-center">
            <div class="grid grid-rows-2 text-center">
              <i class="fa-brands fa-discord fa-2xl" />ดิสคอร์ด
            </div>
          </div>
        </div>
        <div class="indicator">
          <!-- <span class="indicator-item badge badge-primary">new</span> -->
          <div class="grid w-32 h-32 bg-base-300 place-items-center">
<button onclick="topup.showModal()">
            <div class="grid grid-rows-2 text-center">
              <i class="fa-solid fa-wallet fa-2xl" />เติมเงิน
            </div>
          </button>
          </div>
        </div>
  
        <div class="grid w-32 h-32 bg-base-300 place-items-center">
          {#if $tokencheck}
            <button
              on:click={logout}
              class="hover:text-amber-400 hover:font-bold text-lg"
            >
              <div class="grid grid-rows-2 text-center">
                <!-- <button on:click={logout} class="hover:text-sky-400 hover:font-bold text-lg"
            >
            <i class="fa-solid fa-person-through-window fa-2xl"></i>Logout
            </button
            > -->
  
                <i class="fa-solid fa-person-through-window fa-2xl" />ออกจากระบบ
              </div>
            </button>
          {:else}
            <button
              onclick="loginuser_pop.showModal()"
              class="hover:text-sky-400 hover:font-bold text-lg"
            >
              <div class="grid grid-rows-2 text-center">
                <!-- <button on:click={logout} class="hover:text-sky-400 hover:font-bold text-lg"
                >
                <i class="fa-solid fa-person-through-window fa-2xl"></i>Logout
                </button
                > -->
  
                <i class="fa-solid fa-door-open fa-2xl" />เข้าสู่ระบบ
              </div>
            </button>
          {/if}
        </div>
      </div>
    </form>
  
    <form method="dialog" class="modal-backdrop">
      <button />
    </form>
  </dialog>
  