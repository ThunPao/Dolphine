<script>
    import { onMount } from 'svelte';
  
  import {shopData} from "../services/ShopController";

  export let id;
  export let name;
  export let href;
  export let buycount;
  export let point;
  export let limits;
  export let description;
  export let title;

  export let display = 0;
  export let keen;
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
    });
  });
  function setShopdata(){
    shopData.set({
      id,
      name,
      href,
      buycount,
      point,
      limits,
      description,
      title,
    });
  }

</script>


<div class={keen ? "keen-slider__slide px-1 pb-1" :  ""}>

  {#if display == 0}
  <div
    class="card card-compact shadow-md dark:hover:shadow-amber-500 hover:shadow-blue-500 bg-base-200 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <button title="คลิก" onclick="shopinfo.showModal()" on:click={setShopdata}>
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
  {:else}
 <div class="p-3 card card-side bg-base-100 shadow-xl">
        <figure><img src={href} alt="Movie" /></figure>
        <div class="card-body">
          <h2 class="card-title">{name}</h2>
          <p>{point}</p>

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
