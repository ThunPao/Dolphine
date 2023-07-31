<script>
  const cardimg = "https://via.placeholder.com/300x250";
  import Shopcard from "../components/Shopitem.svelte";
  import MockupCard from "../components/Mockup_card.svelte";
  import { getshopitems, shopitems } from "../services/ShopController";
  import Tabs from "../components/Tabs.svelte";
  // import "../services/Sliders";
  import { onMount, tick, afterUpdate } from "svelte";
  import KeenSlider from "keen-slider";
  import "keen-slider/keen-slider.min.css";

  let slider;
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

  afterUpdate(() => {
    if ($shopitems !== null && $shopitems.length > 0) {
      slider = new KeenSlider("#shopitem-slides", {
        breakpoints: {
          "(min-width: 400px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 768px)": {
            slides: { perView: 3, spacing: 10 },
          },
          "(min-width: 1000px)": {
            slides: { perView: 4, spacing: 10 },
          },
        },
        slides: {
          perView: 2,
          spacing: 5,
        },
      });
    }
  });
</script>

<div class="grid grid-cols-1 xl:grid-cols-4 gap-3 xl:m-5">
  <div class="carditems md:col-span-3">
    <!--  -->
    <div class="alert shadow-lg">
      <span
        class="text-4xl bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text"
      >
        <i class="fa-solid fa-rocket mt-4 md:mt-0" />
      </span>
      <div>
        <h3 class="font-bold text-lg">Trends สินค้าติดเทรนด์!</h3>
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
            {#each $shopitems.slice(0, 10) as data}
              <Shopcard
                id={data.id}
                name={data.name}
                href={cardimg}
                buycount={data.buycount}
                point={data.point}
                limits={data.limits}
                description={data.description}
                title={data.titles}
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
  <div class="side-carditems bg-base-200 rounded-lg">
    <div class="overflow-x-auto">
      <Tabs />
    </div>
  </div>
</div>

<div class="bg-base-200 grid gap-2 p-3 justify-center focus:bg-white">
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

    <label class="swap">
      <input type="checkbox" on:click={swapdisplaymode} />
      <div class="swap-on">List</div>
      <div class="swap-off">Grid</div>
    </label>

    <!-- <select title="เลือก" class="select select-bordered join-item">
      <option disabled selected>Category</option>
      <option>Sci-fi</option>
      <option>Drama</option>
      <option>Action</option>
    </select> -->
  </div>
</div>

{#if displaymode}
  {#if $shopitems !== null && $shopitems.length > 0}
    {#each $shopitems.filter(filterShopItems).slice(0, 18) as data}
      <div class="p-3 card card-side bg-base-100 shadow-xl">
        <figure><img src={cardimg} alt="Movie" /></figure>
        <div class="card-body">
          <h2 class="card-title">{data.name}</h2>
          <p>{data.point}</p>

          <div class="card-actions justify-end">
            <button
              title="คลิก"
              onclick="{'shopinfo_' + data.id}.showModal()"
              class="btn btn-primary">ซื้อไอเทม</button
            >
          </div>
        </div>
      </div>
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
    class="grid gap-2 xl:grid-rows-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-1"
  >
    {#if $shopitems !== null && $shopitems.length > 0}
      {#each $shopitems.filter(filterShopItems).slice(0, 18) as data}
        <span
          onclick="{'shopinfo_' + data.id}.showModal()"
          class="cursor-zoom-in"
        >
          <div class="card card-compact w-fit bg-base-100 shadow-xl">
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
                {#if data.point > 0}
                  <p class="font-extrabold text-info">{data.point} DP</p>
                {:else}
                  <p class="font-extrabold text-success">แจกฟรี</p>
                {/if}
              </span>

              <div class="place-items-center w-full">
                <figure>
                  <img src={cardimg} alt="Img" class="rounded-lg w-full" />
                </figure>
              </div>
            </div>
            <div class="card-body">
              <h2 class="card-title h-10">{data.name}</h2>
              <!-- <p>{data.description}</p> -->
              <div
                class="card-actions justify-center md:justify-between align-bottom h-10"
              >
                <div class="font-bold text-md">
                  {#if data.limits > 0}
                    <div
                      class="badge badge-warning md:py-3 {data.limits <= 10
                        ? 'animate-pulse'
                        : ''}"
                    >
                      เหลือ {data.limits}
                    </div>
                  {:else if data.limits <= 0}
                    <div class="badge badge-info md:py-3">สินค้าประจำ</div>
                  {:else if data.limits <= 0}
                    <div class="badge badge-error md:py-3">สินค้าหมด</div>
                  {/if}
                </div>
                <div class="badge badge-base-200 font-medium text-md md:py-3">
                  {data.buycount} ขายแล้ว
                </div>
              </div>
            </div>
          </div>
        </span>
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
