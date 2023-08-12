<script>
  import { logout, tokencheck } from "../services/Authen";
  import { clearinput } from "../services/fieldcontrol";
  // import Discord from "../Icons/Discord.svelte";
  // import House from "../Icons/house-solid.svelte";
  // import Play from "../Icons/Play";
</script>

<dialog id="fast_menu" class="modal">
  <form method="dialog" class="modal-box">
    <div class="font-medium text-4xl text-center py-4">
      <p>เมนู</p>
    </div>
    <div class="grid gap-4 grid-cols-2 md:gap-4 md:grid-cols-3">
      <a href="/">
        <div class="indicator">
          <span class="indicator-item badge badge-primary">new</span>
          <div class="grid w-32 h-32 bg-base-300 place-items-center">
            <div class="grid grid-rows-2 place-items-center">
              <!-- <House /> -->
              <i class="fa-solid fa-house fa-2xl" />
              หน้าหลัก
            </div>
          </div>
        </div>
      </a>
      <div class="indicator">
        <span class="indicator-item badge badge-primary">new</span>
        <div class="grid w-32 h-32 bg-base-300 place-items-center">
          <div class="grid grid-rows-2 place-items-center">
            <i class="fa-brands fa-discord fa-2xl" />
            <!-- <Discord /> -->
            ดิสคอร์ด
          </div>
        </div>
      </div>
      <div class="indicator">
        <!-- <span class="indicator-item badge badge-primary">new</span> -->
        <div class="grid w-32 h-32 bg-base-300 place-items-center">
          <button
            title="คลิก"
            onclick="topup.showModal()"
            on:click={clearinput}
          >
            <div class="grid grid-rows-2 place-items-center">
              <i class="fa-solid fa-wallet fa-2xl" />
              <!-- <Play /> -->
              เติมเงิน
            </div>
          </button>
        </div>
      </div>

      <div class="indicator">
        <!-- <span class="indicator-item badge badge-primary">new</span> -->
        <div class="grid w-32 h-32 bg-base-300 place-items-center">
          <button
            title="คลิก"
            onclick="redeem.showModal()"
            on:click={clearinput}
          >
            <div class="grid grid-rows-2 place-items-center">
              <i class="fa-solid fa-barcode fa-2xl" />กรอกโค๊ด
            </div>
          </button>
        </div>
      </div>

      <div class="grid w-32 h-32 bg-base-300 place-items-center">
        {#if $tokencheck}
          <button
            title="คลิก"
            on:click={logout}
            class="hover:text-amber-400 hover:font-bold text-lg"
          >
            <div class="grid grid-rows-2 place-items-center">
              <!-- <button title="คลิก" on:click={logout} class="hover:text-sky-400 hover:font-bold text-lg"
            >
            <i class="fa-solid fa-person-through-window fa-2xl"></i>Logout
            </button
            > -->

              <i class="fa-solid fa-person-through-window fa-2xl" />ออกจากระบบ
            </div>
          </button>
        {:else}
          <button
            title="คลิก"
            onclick="loginuser_pop.showModal()"
            class="hover:text-sky-400 hover:font-bold text-lg"
          >
            <div class="grid grid-rows-2 place-items-center">
              <!-- <button title="คลิก" on:click={logout} class="hover:text-sky-400 hover:font-bold text-lg"
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
    <button title="คลิก" />
  </form>
</dialog>
