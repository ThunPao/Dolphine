<script>
  const cardimg = "https://via.placeholder.com/300x250";
  import Shopcard from "../components/Shopitem.svelte";
  import { getshopitems, shopitems } from "../services/ShopController";
  import Tabs from "../components/Tabs.svelte";
  // import "../services/Sliders";
  import { onMount, tick, afterUpdate } from "svelte";
  import KeenSlider from "keen-slider";
  import "keen-slider/keen-slider.min.css";

  let slider;
  let searchQuery = "";

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
          perView: 1,
          spacing: 15,
        },
      });
    }
  });
</script>
<div class="grid grid-cols-1 xl:grid-cols-4 gap-3 m-5">
  <div class="carditems md:col-span-3">
    <!--  -->
    <div class="alert shadow-lg">
      <i class="fa-solid fa-rocket fa-2xl text-info mt-4 md:mt-0"></i>
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
        <!-- {shopitems.map((data: any) => -->

        {#if $shopitems !== null}
          {#if $shopitems.length > 0}
            {#each $shopitems.slice(0, 10) as data}
              <Shopcard
                id={data.id}
                title={data.name}
                href={cardimg}
                buycount={data.buycount}
                point={data.point}
                limits={data.limits}
                description={data.description}
              />
            {/each}
          {/if}
        {:else}
          LOADING ...
        {/if}

        <!-- )} -->
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
          class="input input-bordered join-item rounded-lg"
          placeholder="พิมพ์ชื่อไอเทม..."
          bind:value={searchQuery}
          on:keyup={gofinditem}
        />
      </div>
    </div>
    <!-- <select title="เลือก" class="select select-bordered join-item">
      <option disabled selected>Category</option>
      <option>Sci-fi</option>
      <option>Drama</option>
      <option>Action</option>
    </select> -->
  </div>
</div>
<!-- <div class="card card-side bg-base-100 shadow-xl">
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
      </div> -->
<div
  class="grid gap-2 xl:grid-rows-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 p-1"
>
  {#if $shopitems !== null && $shopitems.length > 0}
    {#each $shopitems.filter(filterShopItems).slice(0, 18) as data}
      <div
        class="d-flex relative w-full h-60 overflow-x-hidden p-2 rounded-sm"
        type="button"
        onclick="{'shopinfo_' + data.id}.showModal()"
      >
        <img
          src={cardimg}
          alt=""
          class="absolute inset-0 object-cover w-full h-full transition duration-500 ease-in-out filter brightness-75 hover:brightness-100"
        />
        <div
          class="absolute inset-0 flex items-end p-2 justify-center text-white text-sm font-bold bg-gray-800 bg-opacity-20 transition duration-500 ease-in-out hover:bg-opacity-75"
        >
          {data.name}
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
</div>
