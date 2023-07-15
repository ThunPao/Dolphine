<script>
  const cardimg = "https://via.placeholder.com/300x250";
  import Shopcard from "../components/Shopitem.svelte";
  import { getshopitems,shopitems } from "../services/ShopController";
  import Tabs from "../components/Tabs.svelte";
  // import "../services/Sliders";
  import { onMount, tick, afterUpdate } from "svelte";
  import KeenSlider from "keen-slider";
  import "keen-slider/keen-slider.min.css";

  let slider;

  onMount(async () => {
    getshopitems();
    await tick(); // Wait for the DOM to be fully updated
  });

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
    <div class="">
      <!-- <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" > -->

      <!-- Slider main container -->
      <div id="shopitem-slides" class="keen-slider">
        <!-- Additional required wrapper -->

        <!-- Slides -->
        <!-- {shopitems.map((data: any) => -->
        {#if $shopitems !== null}
        {#if $shopitems.length > 0}
          <!-- {#each $shopitems as data} -->
          {#each $shopitems.slice(0, 10) as data}

            <Shopcard
              id={data.id}
              title={data.name}
              href={cardimg}
              buycount={data.buycount}
              point={data.point}
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

<div class="bg-base-200 grid gap-2 p-3 justify-center">
  <div class="text-2xl font-medium">รายการไอเทมทั้งหมด</div>

  <div class="join">
    <div>
      <div>
        <input class="input input-bordered join-item" placeholder="Search..." />
      </div>
    </div>
    <select class="select select-bordered join-item">
      <option disabled selected>Category</option>
      <option>Sci-fi</option>
      <option>Drama</option>
      <option>Action</option>
    </select>
  </div>
</div>

<div class="grid gap-2 p-1">
  {#if $shopitems !== null && $shopitems.length > 0}
    {#each $shopitems.slice(0, 10) as data}

      <div class="card card-side bg-base-100 shadow-xl">
        <figure><img src={cardimg} alt="Movie" /></figure>
        <div class="card-body">
          <h2 class="card-title">{data.name}</h2>
          <p>{data.point}</p>

          <div class="card-actions justify-end">
            <button class="btn btn-primary">ซื้อไอเทม</button>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
