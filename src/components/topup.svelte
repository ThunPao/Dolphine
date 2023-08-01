<script>
  import { topup } from "../services/topup.js";
  import { inputValue } from "../services/fieldcontrol.js";
  inputValue.set("");
let topupimg = ["images/topup/step1.jpg","images/topup/step2.jpg"];
let tabs = ["Step 1", "Step 2"];
let activeTabIndex = 0;
</script>

<dialog id="topup" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box text-center">
    <!-- Recommend -->

      <div class="flex justify-center">
        <img src={topupimg[activeTabIndex]} alt="วิธีเติมเงิน" class="h-96 w-fit">
      </div>
      <div class="tabs tabs-boxed flex justify-center">
        {#each tabs as tab, index}
        <p class="tab text-2xl"
        class:tab-active={activeTabIndex == index}
      on:click={() => (activeTabIndex = index)}
      aria-hidden="true"
        >{tab}</p> 
        {/each}
      </div>

    <!-- End Recommend -->
    <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
      เติมเงิน
    </h1>
    <h4>ผ่านช่องทาง Truemoney (ระบบซองของขวัญ)</h4>
    <div class="p-3">
      <input
        type="text"
        id="voucherurl"
        placeholder="ลิงก์ซองของขวัญ"
        class="input input-bordered w-full max-w-xs"
        bind:value={$inputValue}
        on:input={(event) => ($inputValue = event.target.value)}
      />
      <div class="justify-center p-3">
        {#if $inputValue.includes("https://gift.truemoney.com")}
          <button
            title="คลิก"
            class="btn btn-success text-2xl text-white"
            on:click={topup}
          >
            ยืนยันการเติมเงิน
          </button>
        {:else}
          <button title="คลิก" class="btn btn-disabled text-lg text-red-300">
            กรอกลิงก์ซองของขวัญให้ถูกต้อง
          </button>
        {/if}
      </div>
    </div>
    <div class="modal-action">
      <button title="คลิก" class="btn flex grow">ปิดหน้าต่างนี้</button>
    </div>
  </form>

</dialog>
