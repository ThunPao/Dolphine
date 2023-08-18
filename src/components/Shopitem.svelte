<script>
  import { onMount, onDestroy } from "svelte";

  import { shopData } from "../services/ShopController";
  // import { imgurl } from "../services/apiurl";
  import { observer } from "../services/basectl";
  import { DateTime } from "luxon";
  // import { updateDateDiff } from "../services/Playdate";
  // Initialize lozad
  export let id;
  export let name;
  export let href;
  export let buycount;
  export let point;
  export let limits;
  export let description;
  export let title;
  export let expired_date;
  export let sale_date;
  export let dateDiff = null;

  export let display = 0;
  export let keen;

  let interval;
  const CurDate = DateTime.local().setZone("Asia/Bangkok");
  function updateDateDiff() {
    if (sale_date && DateTime.fromISO(sale_date) > CurDate) {
      dateDiff = "เริ่ม" + DateTime.fromISO(sale_date).toRelative();
    } else if (expired_date && CurDate < DateTime.fromISO(expired_date)) {
      dateDiff = "จบ" + DateTime.fromISO(expired_date).toRelative();
    } else {
      dateDiff = null;
    }

    return dateDiff;
  }
  onMount(() => {
    shopData.set({
      id,
      name,
      href,
      buycount,
      point,
      limits,
      description,
      title,
      sale_date,
      expired_date,
      dateDiff,
    });
    observer.observe();

    if (sale_date && DateTime.fromISO(sale_date) > CurDate) {
      interval = setInterval(updateDateDiff, 1000); // Update every 1 second
    }
    if (expired_date && CurDate < DateTime.fromISO(expired_date)) {
      interval = setInterval(updateDateDiff, 3000); // Update every 3 seconds
    }
  });
  onDestroy(() => {
    clearInterval(interval);
  });

  function setShopdata() {
    shopData.set({
      id,
      name,
      href,
      buycount,
      point,
      limits,
      description,
      title,
      sale_date,
      expired_date,
      dateDiff,
    });
  }
</script>

<span class={keen ? "keen-slider__slide px-1 pb-1" : ""}>
  {#if display == 0}
    <div
      class="card card-compact shadow-md dark:hover:shadow-amber-500 hover:shadow-blue-500 bg-base-200 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <button
        title="คลิก"
        onclick="shopinfo.showModal()"
        on:click={setShopdata}
      >
        <div class="indicator w-full">
          <span
            class="indicator-item indicator-bottom indicator-center p-2 md:p-3 mb-2 badge badge-base-400 badge-sm font-extrabold sm:text-lg md:text-xl"
          >
            {#if point > 0}
              <p class="font-extrabold text-info">{point} DP</p>
            {:else}
              <p class="font-extrabold text-success">แจกฟรี</p>
            {/if}
          </span>

          {#if limits == 0 || (expired_date && !dateDiff)}
            <span
              class="indicator-item indicator-middle indicator-center badge badge-error md:py-3 bg-opacity-50"
              >หมดแล้วจ้า</span
            >
          {/if}

          <div class="place-items-center overflow-hidden">
            <figure>
              <img
                data-src={href}
                alt="Img"
                class="rounded-lg lozad"
                width="464"
                height="387"
              />
            </figure>
          </div>
        </div>
        <span class="flex justify-between mx-1">
          <div class="font-medium text-xs md:text-sm h-8 md:h-0">
            {dateDiff ? dateDiff : ""}
          </div>
          <div class="font-medium text-xs md:text-sm">
            {buycount} ขายแล้ว
          </div>
        </span>
        <div class="card-body">
          <h2
            class="card-title h-6 md:h-10 text-sm md:text-lg justify-center leading-none"
          >
            {name}
          </h2>
          <div
            class="card-actions justify-center md:justify-between align-bottom h-4 md:h-10"
          >
            <div class="font-bold text-md">
              {#if limits > 0}
                <div
                  class="badge badge-warning badge-sm md:badge-md md:py-3 {limits <=
                  10
                    ? 'animate-pulse'
                    : ''}"
                >
                  เหลือ {limits}
                </div>
              {:else if limits < 0}
                <div class="badge badge-info badge-sm md:badge-md md:py-3">
                  ขายประจำ
                </div>
              {:else}
                <div
                  class="badge badge-error badge-sm md:badge-md md:py-3 font-medium"
                >
                  สินค้าหมด
                </div>
              {/if}
            </div>
            <!-- <div class="badge badge-base-200 font-medium text-xs md:py-3">
              <div class="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
              </div>
            </div> -->
          </div>
        </div>
      </button>
    </div>
  {:else}
    <div class="p-3 card card-side bg-base-100 shadow-xl">
      <!-- <figure><img data-src={imgurl+href} alt="รูปภาพ" class="lozad" /></figure> -->
      <div class="card-body">
        <h2 class="card-title">{name}</h2>
        <p>{description}</p>

        <div class="card-actions justify-end">
          <button
            title="คลิก"
            onclick="shopinfo.showModal()"
            on:click={setShopdata}
            class="btn btn-primary">ซื้อไอเทม</button
          >
        </div>
      </div>
    </div>
  {/if}
</span>
