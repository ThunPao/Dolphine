<script>
  import { shopData } from "../services/ShopController";
  import { onMount, onDestroy } from "svelte";
  import { DateTime } from "luxon";
  // Settings.defaultLocale = "th";

  // Define the variables where you want to store the shop item data
  let id,
    name,
    href,
    buycount,
    point,
    limits,
    description,
    title,
    sale_date,
    expired_date,
    dateDiff = null;

  // Subscribe to the shopData store to get updates
  shopData.subscribe((data) => {
    ({
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
    } = data);
  });
  let interval;
  function updateDateDiff() {
    const CurDate = DateTime.local().setZone("Asia/Bangkok");

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
    if (sale_date > DateTime.local()) {
      interval = setInterval(updateDateDiff, 1000); // Update every 1 second
    }
    if (expired_date < DateTime.local()) {
      interval = setInterval(updateDateDiff, 1000); // Update every 1 second
    }
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<dialog id="shopinfo" class="modal">
  <form
    method="dialog"
    class="modal-box shadow-md dark:shadow-amber-300 shadow-blue-300"
  >
    <p class="font-bold text-lg">รายละเอียดสินค้า</p>
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
          >หมดแล้วจ้า</span
        >
      {/if}
      <div class="place-items-center w-full">
        <figure>
          <img
            src={href}
            alt="Img"
            class="rounded-lg img-fluid"
            width="500"
            height="200"
          />
        </figure>
      </div>
    </div>

    <span class="flex justify-between mx-1">
      <div class="font-medium text-lg">
        {dateDiff ? dateDiff : ""}
      </div>
      <div class="font-medium text-lg">
        {buycount} ขายแล้ว
      </div>
    </span>

    <div class="modal-body text-clip overflow-hidden">
      <h2 class="card-title">
        {name}
      </h2>
      <div class="bg-base-200 rounded p-2">
        {description}
      </div>
      <!-- {#if title && title.includes(",")}
        <br />
        <div class="p-2 rounded-lg bg-base-300 text-center">
          เมื่อซื้อ จะได้รับตามรายการทั้งหมดดังต่อไปนี้<br />
          {#each title.split(",") as item}
            <ul class="menu bg-base-200 rounded-box m-2">
              <li>
                {item}
              </li>
            </ul>
          {/each}
        </div>
      {:else if title}
        <br />
        <div class="p-2 rounded-lg bg-base-300 text-center">
          เมื่อซื้อ จะได้รับรายการดังต่อไปนี้<br />
          <ul class="menu bg-base-200 rounded-box">
            <li>
              {title}
            </li>
          </ul>
        </div>
      {/if} -->
      {#if title}
      <br />
      <div class="p-2 rounded-lg bg-base-300 text-center">
        {#if title.length > 0}
          <div>
            เมื่อซื้อ จะได้รับตามรายการทั้งหมดดังต่อไปนี้
          </div>
          {#each title as item}
            <ul class="menu bg-base-200 rounded-box m-2">
              <li>{item}</li>
            </ul>
          {/each}
        {:else}
          <div>
            เมื่อซื้อ จะได้รับรายการดังต่อไปนี้
          </div>
          <ul class="menu bg-base-200 rounded-box">
            <li>{title}</li>
          </ul>
        {/if}
      </div>
    {/if}
    
      <div class="flex justify-center gap-2 mt-4">
        <!-- <Btncf did={id} {name} {point} {limits} /> -->
        {#if limits > 0 || limits < 0}
          <button
            title="คลิก"
            class="btn btn-primary hover:scale-100 scale-95 duration-75 text-lg w-full"
            onclick="buyitem.showModal();"
            ><i class="fa-solid fa-dollar-sign" />
            ซื้อเลย</button
          >
        {:else if limits <= 0}
          <button title="คลิก" class="btn btn-error hover:scale-105 text-lg">
            สินค้าหมด</button
          >
        {/if}
      </div>
      <div class="modal-action">
        <button title="คลิก" class="btn flex grow">เลือกดูไอเทมอื่น</button>
      </div>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button aria-hidden="true" />
  </form>
</dialog>
