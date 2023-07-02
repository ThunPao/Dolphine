<script>
  export let mobile;
</script>

{#if mobile === "true"}
  <div class="join mb-12">
    <div class="avatar" onclick="my_modal_6.showModal()">
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
        >ออนไลน์</span
      >
    </div>
  </div>
{:else}
  <details class="dropdown">
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
            >ออนไลน์</span
          >
        </div>
      </div>
    </summary>
    <ul
      class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
    >
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </details>
{/if}






