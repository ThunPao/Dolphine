<script>
  import { onMount, onDestroy } from "svelte";

  import { shopData } from "../services/ShopController";
  import lozad from "lozad";
  import moment from "moment";
  import "moment/locale/th";

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
  export let dateDiff = null;

  let date;

  if (expired_date) {
    date = moment(expired_date).endOf("day").fromNow();
    // date = moment(expired_date).format("LT");
    console.log(date);
  }

  export let display = 0;
  export let keen;

  function updateDateDiff() {
    if (expired_date) {
      const currentDate = moment();
      const endDate = moment(expired_date);
      if (currentDate.isBefore(endDate)) {
        dateDiff = endDate.from(currentDate);
      } else {
        dateDiff = null;
      }
    }
  }

  let interval;

  onMount(() => {
    moment.locale("th");

    shopData.set({
      id,
      name,
      href,
      buycount,
      point,
      limits,
      description,
      title,
      expired_date,
      dateDiff,
    });
    const observer = lozad(".lozad", {
      rootMargin: "10px 0px", // Adjust the rootMargin as needed
      threshold: 0.1, // Adjust the threshold as needed
    });
    observer.observe();
    updateDateDiff(); // Initial calculation
    interval = setInterval(updateDateDiff, 1000); // Update every 1 second
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
      expired_date,
      dateDiff,
    });
  }
</script>

<div class={keen ? "keen-slider__slide px-1 pb-1" : ""}>
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
            class="indicator-item indicator-bottom indicator-center p-3 mb-2 badge badge-base-400 font-extrabold sm:text-lg md:text-xl"
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
              >สินค้าหมด</span
            >
          {/if}

          <div class="place-items-center w-full">
            <figure>
              <img data-src={href} alt="Img" class="rounded-lg w-full lozad" />
            </figure>
          </div>
        </div>
        <span class="flex justify-between mx-1">
          <div class="font-medium text-sm">
            {dateDiff ? dateDiff : ""}
          </div>
          <div class="font-medium text-sm">
            {buycount} ขายแล้ว
          </div>
        </span>
        <div class="card-body">
          <h2 class="card-title h-10 text-lg justify-center leading-none">
            {name}
          </h2>
          <div
            class="card-actions justify-center md:justify-between align-bottom"
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
              {/if}
            </div>
            <div class="badge badge-base-200 font-medium text-md md:py-3">
              widget
            </div>
          </div>
        </div>
      </button>
    </div>
  {:else}
    <div class="p-3 card card-side bg-base-100 shadow-xl">
      <figure><img data-src={href} alt="รูปภาพ" class="lozad" /></figure>
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
</div>
