<script>
  import { onMount } from "svelte";
  import { apiurl } from "@services/apiurl";
  import Swal from "sweetalert2";
  import {
    blogsvip,
    getblogdata,
    blogdata,
    blogdata_p,
    toggleFavorite,
  } from "../services/Blogdatas";
  import { currentuser, notlogin } from "../services/Authen";

  export let blogvipstate = false;

  let sub = false;
  let cooldown = false;

  let logoimgvip = "images/dpchan2.webp";
  let logoimg = "images/dpchan1.webp";

  function togglesub() {
    if (!cooldown) {
      if ($blogsvip !== null) {
        sub = !sub;
        cooldown = true;
        blogvipstate = !blogvipstate;
        setTimeout(() => {
          cooldown = false;
        }, 500); // 0.5 seconds cooldown
      } else {
        Swal.fire({
          title: "สิทธ์พิเศษสำหรับสมาชิกระดับ VIP ขึ้นไป",
          icon: "info",
        });
      }
    }
  }

  let blogs = null;

  async function getblogs() {
    try {
      const response = await fetch(apiurl + "blogs");
      if (!response.ok) {
        console.log("Fetching failed: " + response);
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      blogs = responseData.slice(0, 5);
      // blogs = responseData;

      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  onMount(getblogs);
  onMount(getblogdata);
</script>

<div id="top" class="card bg-base-100 shadow-xl w-full">
  <div class="w-full h-52 md:h-[30rem] relative">
    <div
      class="absolute inset-0 bg-cover bg-top bg-no-repeat"
      style="background-image: url('images/00010.webp');"
    />
  </div>
  <div class="lg:container lg:mx-auto rounded-lg">
    <div class="grid grid-rows-2 grid-flow-col gap-4 justify-start">
      <div class="row-span-3">
        <div class="avatar">
          <div
            class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <button
              title="คลิก"
              on:click={() => {
                togglesub();
              }}
            >
              {#if sub === true}
                <img src={logoimgvip} alt="" />
              {:else}
                <img src={logoimg} alt="" />
              {/if}
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-1 text-2xl font-medium pt-4">Dolphine Cagayake!</div>
      <div class="row-span-2">
        วันนี้กินอะไรดี
        {$currentuser != null ? $currentuser.username : ""}
      </div>
    </div>

    <div class="card-actions justify-end">
      <button title="คลิก" class="hidden btn btn-secondary text-xl">
        <i class="fa-solid fa-crown" />
        VIP Available</button
      >
    </div>
  </div>

  <div class="flex flex-col w-full mt-3 mb-16">
    <!-- <div class="grid h-20 card bg-base-100 rounded-box place-items-center" /> -->
  </div>
</div>
<div class="container mx-auto justify-center mt-4 grid grid-flow-row gap-4">
  <div class="max-w-[690px] grid grid-rows-1 gap-4">
    {#if blogvipstate == false}
      <!-- Begin Loop -->
      {#if blogs !== null && blogs.length > 0}
        {#each blogs as data}
          <div class="card  bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{data.title}</h2>
              <div class="text-sm max-w-sm">
                {data.description}
              </div>
            </div>

            <button
              title="คลิก"
              on:click={() => {
                $currentuser ? toggleFavorite(data.id) : notlogin();
              }}
            >
              <button title="คลิก">
                <img
                  src={data.img_cover}
                  alt={data.title}
                />
              </button>

              <div class="flex justify-start mx-3 p-3">
                {#if $blogdata_p !== null && $blogdata_p.length > 0}
                  <button
                    title="คลิก"
                    on:click={() => {
                      $currentuser ? toggleFavorite(data.id) : notlogin();
                    }}
                    class="text-2xl"
                  >
                    <i
                      class="{$blogdata_p.find((item) =>
                        item.blogliked.includes(data.id)
                      )
                        ? 'fa-solid'
                        : 'fa-regular'} fa-heart active:animate-ping"
                      style={$blogdata_p.find((item) =>
                        item.blogliked.includes(data.id)
                      )
                        ? "color: #ff0000;"
                        : ""}
                    />
                  </button>
                {:else}
                  <button title="คลิก" on:click={notlogin} class="text-2xl">
                    <i class="fa-regular fa-heart active:animate-ping" />
                  </button>
                {/if}
                <!-- blogdata -->

                {#if $blogdata !== null && $blogdata.length > 0}
                  &nbsp;{$blogdata.filter((item) =>
                    item.blogliked.includes(data.id)
                  ).length} Likes
                {/if}
              </div>
            </button>
          </div>
        {/each}
      {/if}
      <!-- End Loop -->
    {:else}
      <!-- blogsvip -->
      {#if $blogsvip !== null && $blogsvip.length > 0}
        {#each $blogsvip as data, index}
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{data.title}</h2>
              <div class="text-sm">
                {data.description}
              </div>
            </div>

            <button
              title="คลิก"
              on:click={() => {
                $currentuser ? toggleFavorite(data.id) : notlogin();
              }}
            >
              <button title="คลิก">
                <img
                  class="rounded-t-lg w-full"
                  src={data.img_cover}
                  alt={data.title}
                />
              </button>
              <div class="flex justify-start mx-3 p-3">
                {#if $blogdata_p !== null && $blogdata_p.length > 0}
                  <button
                    title="คลิก"
                    on:click={() => {
                      $currentuser ? toggleFavorite(data.id) : notlogin();
                    }}
                    class="text-2xl"
                  >
                    <i
                      class="{$blogdata_p.find((item) =>
                        item.blogliked.includes(data.id)
                      )
                        ? 'fa-solid'
                        : 'fa-regular'} fa-heart active:animate-ping"
                      style={$blogdata_p.find((item) =>
                        item.blogliked.includes(data.id)
                      )
                        ? "color: #ff0000;"
                        : ""}
                    />
                  </button>
                {:else}
                  <button title="คลิก" on:click={notlogin} class="text-2xl">
                    <i class="fa-regular fa-heart active:animate-ping" />
                  </button>
                {/if}
                <!-- blogdata -->
                {#if $blogdata !== null && $blogdata.length > 0}
                  &nbsp;{$blogdata.filter((item) =>
                    item.blogliked.includes(data.id)
                  ).length} Likes
                {/if}
              </div>
            </button>
          </div>
        {/each}
      {/if}
      <!-- End Loop -->
    {/if}
    <!-- {#if !blogs}
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body h-64">
          <h2 class="card-title">Loading</h2>

          <div class="text-sm">Loading...</div>
        </div>
      </div>
    {/if} -->
  </div>
</div>
