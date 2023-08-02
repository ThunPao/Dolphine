<script>
  let items = ["Apple", "Banana", "Orange", "Grapes"];
  let imgurl =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
</script>

<div class="grid gap-1">
  <div class="join items-center">
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img src={imgurl} alt="" />
      </div>
    </div>
    <div class="grid grid-rows-2 text-start mx-2">
      <span class="text-2xl text-info">I3a0</span>
      <span class="text-md">อันดับสูงสุดตลอดกาล</span>
    </div>
  </div>

  <div class="avatar-group -space-x-6">
    {#each items as data, i}
      <div class="avatar">
        <div class="w-12">
          <img alt={data[i]} src={imgurl} />
        </div>
      </div>
    {/each}
  </div>
</div>
