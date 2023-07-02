
<script>
    // let nsfw = false;
    const nsfw = 0;
    
    function togglensfw(){
        // nsfw = !nsfw;
        alert("TEST");
        console.log("TEST");
    }

</script>
<div class="card w-full bg-base-100 shadow-xl">
    <figure><img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" alt="Shoes" /></figure>
    <div class="lg:container lg:mx-auto rounded-lg">
    <div class="card-body">
<div class="join">
        <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <label class="swap swap-flip text-9xl">
                    <input type="checkbox" />
                    <div class="swap-on"><img src="/images/dpchan.png" alt=""></div>
                    <div class="swap-off"><img src="/images/dpchan1.png" alt=""></div>
                  </label>
              
              
            </div>
            <h2 class="card-title px-4">Dolphine!</h2>
          </div>
     
    </div>
    <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-full mt-3">
    <div class="grid h-20 card bg-base-100 rounded-box place-items-center">
sfs
<button class="btn btn-secondary" on:click={() => {
    togglensfw();
  }}>HELLO</button>
{#if nsfw === true}
<img src="/images/dpchan.png" alt="">
{:else}
<img src="/images/dpchan1.png" alt="">
{/if}
    </div> 
  </div>  </div>