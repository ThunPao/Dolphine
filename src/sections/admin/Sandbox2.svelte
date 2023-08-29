<script>
  let items = ["Apple", "Banana", "Orange", "Grapes"];
  let imgurl =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
</script>

<div class="grid gap-1">
  {#if items[0]}
    <div class="join items-center">
      <div class="indicator">
        <span
          class="indicator-item indicator-bottom badge badge-secondary font-extrabold mb-3 h-6"
          >{items[0]}</span
        >
        <div class="avatar px-2 py-2">
          <div
            class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <img src={imgurl} alt="" />
          </div>
        </div>
      </div>
      <div class="grid grid-rows-2 text-start mx-2">
        <span class="text-2xl text-info">อันดับสูงสุดตลอดกาล</span>
        <span class="text-md">Lorem ipsum dolor sit amet.</span>
      </div>
    </div>
  {/if}
  <div class="bg-base-200 p-3">
    <div class="join">
      {#each items as data, i}
        <div class="tooltip tooltip-bottom tooltip-netural" data-tip={data}>
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img alt={data[i]} src={imgurl} />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
