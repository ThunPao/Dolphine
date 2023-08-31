<script>
  let items = ["Apple", "Banana", "Orange", "Grapes"];
  let imgurl =
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
  let value = 0;
import {getCookie, setCookie} from "../../services/cookies"
  let hello = getCookie("auth");
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="btn btn-secondary" on:click={setCookie("auth","hellowa",30)}>SET</div>

THE COOKIE ARE {hello}

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

<!-- New -->
แปรผัน
<input type="range" min="0" max="100" value="25" class="range" step="25" />
<div class="w-full flex justify-between text-xs px-2">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
</div>

<div class="h-96 w-fit">
  <input
    type="range"
    min="10"
    max="10000"
    bind:value
    on:range={value}
    class="range"
    disabled
  />

  <p>ใส่จำนวน</p>
  <div class="form-control w-full max-w-xs">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
      <span class="label-text">ระบุจำนวนเงิน (10 - 10,000)</span>
    </label>
    <input
      type="number"
      placeholder="Type here"
      class="input input-bordered input-secondary w-full max-w-xs"
      bind:value
    />
  </div>
  {#if value < 10 || value > 10000}
    <p class="badge badge-secondary">จำนวนเงินไม่ถูกต้อง (10-10000)</p>
  {:else}
    <div class="badge badge-info">ได้รับ {value} DP และ {value / 10} RP</div>
  {/if}
</div>
