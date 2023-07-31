<script>
  import Btncf from "./buyshopitem.svelte";

  export let id;
  export let name;
  export let href;
  export let buycount;
  export let point;
  export let limits;
  export let description;
  export let title;
</script>

<div class="keen-slider__slide px-1 pb-1">
  <div
    class="card card-compact shadow-md dark:hover:shadow-amber-500 hover:shadow-blue-500 bg-base-200 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <button title="คลิก" onclick="{'shopinfo_' + id}.showModal()">
      <div class="indicator w-full">
        <span
          class="indicator-item indicator-bottom indicator-center p-3 mb-2 badge badge-base-400 font-extrabold sm:text-lg md:text-xl"
        >
          {#if point > 0}
            <p class="font-extrabold text-info">{point} DP</p>
          {:else}
            <p class="font-extrabold text-success">แจกฟรี</p>
          {/if}
        </span>

        <div class="place-items-center w-full">
          <figure>
            <img src={href} alt="Img" class="rounded-lg w-full" />
          </figure>
        </div>
      </div>

      <div class="card-body">
        <h2 class="card-title h-10 text-lg justify-center leading-none">
          {name}
        </h2>
        <div
          class="card-actions justify-center md:justify-between align-bottom h-10"
        >
          <div class="font-bold text-md">
            {#if limits > 0}
              <div
                class="badge badge-warning md:py-3 {limits <= 10
                  ? 'animate-pulse'
                  : ''}"
              >
                เหลือ {limits}
              </div>
            {:else if limits < 0}
              <div class="badge badge-info md:py-3">สินค้าประจำ</div>
            {:else if limits <= 0}
              <div class="badge badge-error md:py-3">สินค้าหมด</div>
            {/if}
          </div>
          <div class="badge badge-base-200 font-medium text-md md:py-3">
            {buycount} ขายแล้ว
          </div>
        </div>
      </div>
    </button>
  </div>
</div>
<!-- <dialog id={"shopinfo_" + id} class="modal">
  <form
    method="dialog"
    class="modal-box shadow-md dark:shadow-amber-300 shadow-blue-300"
  >
    <h3 class="font-bold text-lg">รายละเอียดสินค้า</h3>
    <div class="indicator w-full">
      <span
        class="indicator-item indicator-bottom indicator-center p-3 mb-2 badge badge-base-200 font-extrabold sm:text-lg md:text-xl"
      >
        {#if point > 0}
          <p class="font-extrabold text-info">{point} DP</p>
        {:else}
          <p class="font-extrabold text-success">แจกฟรี</p>
        {/if}
      </span>

      <div class="place-items-center w-full">
        <figure>
          <img src={href} alt="Img" class="rounded-lg w-full" />
        </figure>
      </div>
    </div>

    <div class="flex justify-between">
      <div class="hidden badge badge-success font-bold text-lg">
        สินค้าเข้าใหม่
      </div>

      <div>
        <div class="hidden badge badge-primary font-bold text-lg">
          {buycount} ซื้อแล้ว
        </div>
      </div>
    </div>
    <div class="modal-body text-clip overflow-hidden">
      <h2 class="card-title">
        {name}
      </h2>
      <div class="bg-base-200 rounded p-2">
        {description}
      </div>

      {#if title && title.includes(",")}
        {#each title.split(",") as item}
          <li>{item}</li>
        {/each}
      {:else if title}
        <br />
        <div class="p-2 rounded-lg bg-base-300">
          เมื่อซื้อ จะได้รับไอเทมดังต่อไปนี้<br />
          <li>{title}</li>
        </div>
      {/if}

      <div class="flex justify-center gap-2 mt-4">
        <Btncf did={id} {name} {point} {limits} />
      </div>
      <div class="modal-action">
        <button title="คลิก" class="btn flex grow">เลือกดูไอเทมอื่น</button>
      </div>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button title="คลิก" />
  </form>
</dialog> -->
