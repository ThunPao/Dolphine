<script>
  // const cardimg = "https://via.placeholder.com/464x387";
  import Shopcard from "../components/Shopitem.svelte";
  import MockupCard from "../components/Mockup_card.svelte";
  import { getshopitems, shopitems } from "../services/ShopController";
  import Tabs from "../components/Tabs.svelte";
  import { onMount, tick, afterUpdate } from "svelte";
  import KeenSlider from "keen-slider";
  import "keen-slider/keen-slider.min.css";
  import { imgurl } from "../services/apiurl";
  import { updateDateDiff } from "../services/Playdate";

  const defaultimg = imgurl + "default.webp";

  let slider = null;
  let searchQuery = "";
  let displaymode = false;
  function swapdisplaymode() {
    displaymode = !displaymode;
  }
  onMount(async () => {
    getshopitems();
    await tick(); // Wait for the DOM to be fully updated
  });

  function filterShopItems(item) {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  }

  function gofinditem() {
    shopitems.update((items) => items);
  }

  // Function to initialize the KeenSlider
  function initializeSlider() {
    if ($shopitems !== null && $shopitems.length > 0 && !slider) {
      slider = new KeenSlider("#shopitem-slides", {
        renderMode: performance,
        breakpoints: {
          "(min-width: 400px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 768px)": {
            slides: { perView: 3, spacing: 10 },
          },
          "(min-width: 1000px)": {
            slides: { perView: 5, spacing: 10 },
          },
        },
        slides: {
          perView: 2,
          spacing: 5,
        },
      });
    }
  }

  onMount(initializeSlider);
  afterUpdate(initializeSlider);

  //   if (shopitems !== null && shopitems.length > 0){
  // each(shopitems.slice(0, 10) as data){

  // }
  //   }
</script>

<div class="grid grid-cols-1 xl:grid-cols-4 xl:m-5">
  <div class="carditems md:col-span-3">
    <!--  -->
    <div class="alert xl:rounded-r-none shadow-lg">
      <span
        class="text-4xl bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text"
      >
        <i class="fa-solid fa-rocket mt-4 md:mt-0" />
      </span>
      <div>
        <p class="font-bold text-lg">Trends สินค้าติดเทรนด์!</p>
        <div class="text-xs">สินค้าที่มีคนซื้อมากที่สุด</div>
      </div>
    </div>
    <div class="mt-2">
      <!-- <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" > -->

      <!-- Slider main container -->
      <div id="shopitem-slides" class="keen-slider">
        <!-- Additional required wrapper -->
        <!-- Slides -->
        {#if $shopitems !== null}
          {#if $shopitems.length > 0}
            {#each $shopitems.slice(0, 5) as data}
              <Shopcard
                display="0"
                keen="true"
                id={data.id}
                name={data.name}
                href={!data.href ? defaultimg : imgurl + data.href}
                buycount={data.buycount}
                point={data.point}
                limits={data.limits}
                description={data.description}
                title={data.titles}
                sale_date={data.sale_date}
                expired_date={data.expired_date}
                dateDiff={updateDateDiff(data.sale_date, data.expired_date)}
              />
            {/each}
          {/if}
        {:else}
          <MockupCard />
          <MockupCard />
        {/if}
      </div>
      <!-- </div> -->
    </div>
  </div>
  <div class="bg-base-200 rounded-lg xl:rounded-l-none">
    <div class="overflow-x-auto">
      <Tabs />
    </div>
  </div>
</div>

<div class="bg-base-200 grid gap-2 p-3 justify-center rounded-lg">
  <div class="text-2xl font-medium">รายการไอเทมทั้งหมด</div>

  <div class="join">
    <div>
      <div>
        <input
          class="input input-bordered join-item rounded-lg caret-info"
          placeholder="พิมพ์ชื่อไอเทม..."
          bind:value={searchQuery}
          on:keyup={gofinditem}
        />
      </div>
    </div>
    <label class="swap rounded-lg bg-primary p-3 join-item">
      <input type="checkbox" on:click={swapdisplaymode} />
      <div class="swap-on"><i class="fa-solid fa-list" /></div>
      <div class="swap-off">
        <i class="fa-solid fa-table-cells-large" />
      </div>
      <span class="sr-only">สลับโหมด</span>
    </label>
  </div>
</div>

{#if displaymode}
  {#if $shopitems !== null && $shopitems.length > 0}
    {#each $shopitems.filter(filterShopItems).slice(0, 12) as data}
      <Shopcard
        display="1"
        keen="false"
        id={data.id}
        name={data.name}
        href={!data.href ? defaultimg : imgurl + data.href}
        buycount={data.buycount}
        point={data.point}
        limits={data.limits}
        description={data.description}
        title={data.titles}
        sale_date={data.sale_date}
        expired_date={data.expired_date}
        dateDiff={updateDateDiff(data.sale_date, data.expired_date)}
      />
    {/each}
    {#if $shopitems.filter(filterShopItems).length === 0}
      <div class="mockup-window border border-base-300">
        <div
          class="flex justify-center px-4 py-16 border-t border-base-300 text-4xl"
        >
          ไม่พบไอเทม
        </div>
      </div>
    {/if}
  {:else}
    <p>No shop items found.</p>
  {/if}
{:else}
  <div
    class="grid gap-2 xl:grid-rows-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-1 overscroll-y-auto"
  >
    {#if $shopitems !== null && $shopitems.length > 0}
      {#each $shopitems.filter(filterShopItems).slice(0, 18) as data}
        <Shopcard
          display="0"
          keen="false"
          id={data.id}
          name={data.name}
          href={!data.href ? defaultimg : imgurl + data.href}
          buycount={data.buycount}
          point={data.point}
          limits={data.limits}
          description={data.description}
          title={data.titles}
          sale_date={data.sale_date}
          expired_date={data.expired_date}
          dateDiff={updateDateDiff(data.sale_date, data.expired_date)}
        />
      {/each}
      {#if $shopitems.filter(filterShopItems).length === 0}
        <div class="mockup-window border border-base-300">
          <div
            class="flex justify-center px-4 py-16 border-t border-base-300 text-4xl"
          >
            ไม่พบไอเทม
          </div>
        </div>
      {/if}
    {:else}
      <p>No shop items found.</p>
    {/if}
  </div>
{/if}
