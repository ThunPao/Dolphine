<script>
  // import {id,name,href,buycount,point,limits,description,title} from "../components/Shopitem.svelte"
  import { shopData } from "../services/ShopController";
  // import { onMount } from 'svelte';
  // Define the variables where you want to store the shop item data
  let id, name, href, buycount, point, limits, description, title;

  // Subscribe to the shopData store to get updates
  shopData.subscribe((data) => {
    ({ id, name, href, buycount, point, limits, description, title } = data);
  });
</script>

<dialog id="shopinfo" class="modal">
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
        <br />
        <div class="p-2 rounded-lg bg-base-300">
          เมื่อซื้อ จะได้รับตามรายการทั้งหมดดังต่อไปนี้<br />
          {#each title.split(",") as item}
            <li>{item}</li>
          {/each}
        </div>
      {:else if title}
        <br />
        <div class="p-2 rounded-lg bg-base-300">
          เมื่อซื้อ จะได้รับรายการดังต่อไปนี้<br />
          <li>{title}</li>
        </div>
      {/if}

      <div class="flex justify-center gap-2 mt-4">
        <!-- <Btncf did={id} {name} {point} {limits} /> -->
        {#if limits > 0 || limits < 0}
          <button
            title="คลิก"
            class="btn btn-primary hover:scale-105 text-lg"
            onclick="buyitem.showModal();"
            ><i class="fa-solid fa-dollar-sign" />
            ซื้อเลย</button
          >
        {:else if limits <= 0}
          <button title="คลิก" class="btn btn-warning hover:scale-105 text-lg">
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
    <button title="คลิก" />
  </form>
</dialog>
