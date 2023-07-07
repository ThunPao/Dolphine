<script>
  export let mobile;
  import { logout, tokencheck, currentuser } from "../services/Authen";
</script>

{#if mobile === "true"}
  <div class="join mb-12">
    <div class="avatar" onclick="fast_menu.showModal()">
      <div class="w-20 rounded-full flex">
        <img
          alt="Profile"
          style="object-fit: cover; object-position: top"
          src="https://render.skinmc.net/3d.php?user=fff99fed-cba5-4aef-aa69-5a214aa5944c&amp;hr=-25&amp;vr=-10&amp;hrh=0&amp;vrll=25&amp;vrrl=-25&amp;vrla=-20&amp;vrra=20&amp;aa=false&amp;ratio=25"
        />
      </div>
    </div>
    <div class="indicator">
      <span
        class="indicator-item indicator-bottom badge bg-green-500 text-white font-medium"
      >
        {#if $currentuser != null}
          {$currentuser[0].points} DP
        {:else}
          กรุณาล็อคอิน
        {/if}
      </span>
    </div>
  </div>
{:else}
  <details class="dropdown dropdown-bottom dropdown-end">
    <summary class="">
      <div class="join">
        <div class="avatar">
          <div class="w-16 rounded-full flex">
            <img
              alt="Profile"
              style="object-fit: cover; object-position: top"
              src="https://render.skinmc.net/3d.php?user=fff99fed-cba5-4aef-aa69-5a214aa5944c&amp;hr=-25&amp;vr=-10&amp;hrh=0&amp;vrll=25&amp;vrrl=-25&amp;vrla=-20&amp;vrra=20&amp;aa=false&amp;ratio=25"
            />
          </div>
        </div>
        <div class="indicator">
          <span
            class="indicator-item indicator-bottom badge bg-green-500 text-white font-medium"
          >
            {#if $currentuser != null}
              {$currentuser[0].points} DP
            {:else}
              กรุณาล็อคอิน
            {/if}
          </span>
        </div>
      </div>
    </summary>
    <ul
      class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
    >
      <li>
        <a href="/" class="hover:text-sky-400 hover:font-bold text-lg"
          ><i class="fa-solid fa-house" />หนัาหลัก</a
        >
      </li>
      <li>
        <a href="/dolphine" class="hover:text-sky-400 hover:font-bold text-lg"
          >Dolphine Blogs</a
        >
      </li>
      <li>
        {#if $tokencheck}
          <button
            on:click={logout}
            class="hover:text-sky-400 hover:font-bold text-lg"
            ><i class="fa-solid fa-person-through-window" /> Logout</button
          >
        {:else}
          <button
            onclick="loginuser_pop.showModal()"
            class="hover:text-sky-400 hover:font-bold text-lg"
            ><i class="fa-solid fa-door-open" /> Login</button
          >
        {/if}
      </li>
    </ul>
  </details>
{/if}
