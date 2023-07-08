<script>
  import { onMount } from "svelte";
  import {blogsvip} from "../services/Blogvip";
  import {currentuser, notlogin} from "../services/Authen"
export let blogvipstate = false;

  let sub = false;
  let cooldown = false;

  // let blogvipstate = false;

  var url = "http://127.0.0.1:3005/";

  function togglesub() {
    if (!cooldown) {
      sub = !sub;
      cooldown = true;
      blogvipstate = !blogvipstate;
      setTimeout(() => {
        cooldown = false;
      }, 500); // 0.5 seconds cooldown
    }
  }


  let blogs = null;
  // let blogsvip = null;

  // const { id, title, description } = blogs;

  let blogdata = null;
  let blogdata_p = null;

  async function getblogs() {
    try {
      const response = await fetch(url + "blogs");
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


  async function getblogdataplayer() {
    const currentid = $currentuser != null ? $currentuser[0].id : '';
    try {
      const response = await fetch(url + "blogdata/"+currentid);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      blogdata_p = responseData.slice(0, 5);
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  async function getblogdata() {
    try {
      const response = await fetch(url + "blogdata");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      blogdata = responseData;
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleFavorite(playerId, blogId) {
    try {
      // Make a POST request to the server
      const response = await fetch(url + "blogdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player_id: playerId, blog_id: blogId }),
      });

      // Check the response status
      if (response.ok) {
        getblogdata();
        // getblogdataplayer();
        if(currentuser != null){
          getblogdataplayer();

}
        // If the request is successful, update the local blogdata array
      } else {
        // If the request fails, display an error message
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }


  onMount(getblogs);
// {$currentuser != null ? $currentuser[0].username : ''}
if(currentuser != null){
  onMount(getblogdataplayer);
}

  onMount(getblogdata);
</script>

<div class="card bg-base-100 shadow-xl px-2 w-full">
  <!-- <img class="bg-cover inset-0"
    src="images/00132-3553236710.png"
    alt="Cover"
  /> -->
  <div class="w-full h-52 md:h-[30rem] relative">
    <div
      class="absolute inset-0 bg-cover bg-top bg-no-repeat"
      style="background-image: url('images/00010.png');"
    />
  </div>
  <div class="lg:container lg:mx-auto rounded-lg">
    <div class="grid grid-rows-2 grid-flow-col gap-4 justify-start">
      <div class="row-span-3">
        <div class="avatar">
          <div
            class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
          <button on:click={() => {
            togglesub();
          }}>
            {#if sub === true}
              <img src="/images/dpchan.png" alt="" />
            {:else}
              <img src="/images/dpchan1.png" alt="" />
            {/if}
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-1 text-2xl font-medium pt-4">Dolphine</div>
      <div class="row-span-2">
        วันนี้กินอะไรดี
        {$currentuser != null ? $currentuser[0].username : ''}


      </div>
    </div>

    <div class="card-actions justify-end">
      <button class="hidden btn btn-secondary text-xl">
        <i class="fa-solid fa-crown" />
        VIP Available</button
      >
    </div>
  </div>

  <div class="flex flex-col w-full mt-3">
    <div class="grid h-20 card bg-base-100 rounded-box place-items-center">
    </div>
  </div>
</div>
<div class="container mx-auto justify-center mt-4 grid grid-flow-row gap-4">
  <div class="max-w-[690px] grid grid-rows-1 gap-4">
    {#if blogvipstate == false}
      <!-- Begin Loop -->
      {#if blogs !== null && blogs.length > 0}
        {#each blogs as data, index}
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{data.id} {data.title}</h2>
              <div class="text-sm">
                {data.description}
              </div>
            </div>
            <button on:click={() => {$currentuser ? toggleFavorite($currentuser[0].id, data.id) : notlogin()}}>
              <button>
                <img class="rounded-t-lg w-full" src={data.img_cover} alt={data.title} />
              </button>
              <div class="flex justify-end mr-3 p-3">
                {#if blogdata_p !== null && blogdata_p.length > 0}
                  <!-- blogdata -->
                  {#if blogdata !== null && blogdata.length > 0}
                    {blogdata.filter((item) => item.blogliked.includes(data.id)).length} Likes &nbsp;
                  {/if}
                  <button on:click={() => {$currentuser ? toggleFavorite($currentuser[0].id, data.id) : notlogin()}} class="text-2xl">
                    <i class="{blogdata_p.find((item) => item.blogliked.includes(data.id)) ? 'fa-solid' : 'fa-regular'} fa-heart active:animate-ping" style={blogdata_p.find((item) => item.blogliked.includes(data.id)) ? "color: #ff0000;" : ""} />
                  </button>
                {:else}
                  <button on:click={toggleFavorite(1, data.id)} class="text-2xl">
                    <i class="fa-regular fa-heart active:animate-ping" />
                  </button>
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
              <h2 class="card-title">{data.id} {data.title}</h2>
              <div class="text-sm">
                {data.description}
              </div>
            </div>
            <button on:click={toggleFavorite(1, data.id)} class="">
              <img class="rounded-t-lg w-full" src={data.img_cover} alt={data.title} />
            </button>
            <div class="flex justify-end mr-3 p-3">
              {#if blogdata_p !== null && blogdata_p.length > 0}
                <!-- blogdata -->
                {#if blogdata !== null && blogdata.length > 0}
                  {blogdata.filter((item) => item.blogliked.includes(data.id)).length} Likes &nbsp;
                {/if}
                <button on:click={toggleFavorite(1, data.id)} class="text-2xl">
                  <i class="{blogdata_p.find((item) => item.blogliked.includes(data.id)) ? 'fa-solid' : 'fa-regular'} fa-heart active:animate-ping" style={blogdata_p.find((item) => item.blogliked.includes(data.id)) ? "color: #ff0000;" : ""} />
                </button>
              {:else}
                <button on:click={toggleFavorite(1, data.id)} class="text-2xl">
                  <i class="fa-regular fa-heart active:animate-ping" />
                </button>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
      <!-- End Loop -->
    {/if}
  </div>
</div>
