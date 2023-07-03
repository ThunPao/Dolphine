<script>
  import { onMount } from "svelte";

  let sub = false;
  let cooldown = false;
  let heart = false;

  function toggleheart() {
    if (!cooldown) {
      heart = !heart;
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 500); // 0.5 seconds cooldown
    }
  }

  function togglesub() {
    if (!cooldown) {
      sub = !sub;
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 500); // 0.5 seconds cooldown
    }
  }

  let blogs = null;
  async function getblogs() {
    try {
      const response = await fetch("http://127.0.0.1:3005/blogs");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      blogs = responseData.slice(0, 5);
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }
  onMount(getblogs);
</script>

<div class="card w-full bg-base-100 shadow-xl px-2">
  <img
    src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
    alt="Shoes"
  />
  <div class="lg:container lg:mx-auto rounded-lg">
    <div class="grid grid-rows-3 grid-flow-col gap-4 justify-start">
      <div class="row-span-3">
        <div class="avatar">
          <div
            class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            {#if sub === true}
              <img src="/images/dpchan.png" alt="" />
            {:else}
              <img src="/images/dpchan1.png" alt="" />
            {/if}
          </div>
        </div>
      </div>
      <div class="col-span-2 text-2xl font-medium pt-4">Dolphine</div>
      <div class="row-span-2">
        If a dog chews shoes whose shoes does he choose?
      </div>
    </div>

    <div class="card-actions justify-end">
      <button class="btn btn-secondary">ติดตาม</button>
    </div>
  </div>

  <div class="flex flex-col w-full mt-3">
    <div class="grid h-20 card bg-base-100 rounded-box place-items-center">
      sfs
      <button
        class="btn btn-secondary"
        on:click={() => {
          togglesub();
        }}>HELLO</button
      >
      {#if sub === true}
        true
      {:else}
        false
      {/if}
    </div>
  </div>
</div>
<div class="container mx-auto justify-center mt-4 grid grid-flow-row gap-4">
  <div class="max-w-[690px] grid grid-rows-1 gap-4">
    {#if blogs !== null && blogs.length > 0}
      {#each blogs as data, index}
        <div class="card w-full bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{data.title}</h2>
            <div class="text-sm">
              {data.description}
            </div>
          </div>

          <button on:click={toggleheart} class="">
            <img
              class="rounded-t-lg w-full"
              src={data.img_cover}
              alt={data.title}
            />
          </button>
          <div class="flex justify-end mr-3">
            <b>{data.likes}</b>&nbsp Liked &nbsp
            <button on:click={toggleheart} class="text-2xl">
              {#if heart === true}
                <i
                  class="fa-solid fa-heart active:animate-ping"
                  style="color: #ff0000;"
                />
              {:else}
                <i class="fa-regular fa-heart" />
              {/if}
            </button>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
