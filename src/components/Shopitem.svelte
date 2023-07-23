<script>
  import Btncf from "./buyshopitem.svelte";

  export let id;
  export let title;
  export let href;
  export let buycount;
  export let point;
  export let limits;
  export let description;
</script>

<div class="keen-slider__slide px-1 pb-1">
  <div
    class="card bg-base-200 shadow-md dark:hover:shadow-amber-500 hover:shadow-blue-500"
  >
    <button onclick="{'shopinfo_' + id}.showModal()">
      <!-- <img src={href} alt="Img" class="rounded-lg w-full" /> -->

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

      <div class="xs:flex sm:flex md:flex justify-between p-1">
        <div>
          <div class="badge badge-info font-bold text-md py-3">
            {#if limits > 0}
              คงเหลือ {limits}
            {:else if limits < 0}
              ไม่จำกัดการซื้อ
            {:else if limits <= 0}
              สินค้าหมด
            {/if}
          </div>
        </div>
        <div>
          <div class="badge badge-primary font-bold text-lg py-4">
            {buycount} ซื้อแล้ว
          </div>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title text-center">{title}</h2>
        <!-- <p>{description}</p> -->
      </div>
    </button>
  </div>
</div>
<dialog id={"shopinfo_" + id} class="modal">
  <form
    method="dialog"
    class="modal-box shadow-md dark:shadow-amber-300 shadow-blue-300"
  >
    <h3 class="font-bold text-lg">รายละเอียดสินค้า</h3>
    <div class="indicator w-full">
      <!-- <span
        class="invisible indicator-item indicator-top indicator-end badge badge-secondary"
        >ยอดนิยม</span
      >
      <span
        class="invisible indicator-item indicator-bottom mr-5 indicator-end badge badge-secondary"
        >{buycount} ซื้อแล้ว</span
      > -->
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
    <div class="modal-body">
      <h2 class="card-title">{title}</h2>
      <p class="bg-base-200 rounded p-2">{description}</p>

      <div class="flex justify-center gap-2 mt-4">
        <Btncf did={id} {title} {point} {limits} />

        {#if limits > 0 || limits < 0}
          <button class="btn btn-secondary hover:scale-105 text-lg">
            <i class="fa-solid fa-cart-shopping" />หยิบใส่ตระก้า</button
          >
        {/if}
      </div>
      <div class="modal-action">
        <button class="btn flex grow">เลือกดูไอเทมอื่น</button>
      </div>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button />
  </form>
</dialog>
