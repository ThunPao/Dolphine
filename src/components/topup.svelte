<script>
  import { topup } from "../services/topup.js";
  import { inputValue } from "../services/fieldcontrol.js";

  inputValue.set("");
  let topupimg = [
    "images/topup/step0.webp",
    "images/topup/step1.webp",
    "images/topup/step2.webp",
  ];
  let tabs = ["เรทการเติม", "วิธีเติมเงิน"];
  let activeTabIndex = 0;
  let value = 10;
</script>

<dialog
  id="topup"
  class="modal modal-middle place-items-end justify-center lg:place-items-center lg:justify-normal"
>
  <form method="dialog" class="modal-box text-center w-full max-w-5xl">
    <!-- Recommend -->
    <div class="grid lg:grid-cols-2">
      <div class="">
        {#if activeTabIndex == 0}
          <div class="h-96 w-full">
            <div class="text-xl font-bold">อัตราการเติมเงิน</div>
            <div class="overflow-x-auto h-48 overflow-y-auto">
              <table class="table text-center text-2xl">
                <!-- head -->
                <thead>
                  <tr class="text-3xl">
                    <th class="text-info">จำนวนเงินขั้นต่ำ</th>
                    <th class="text-secondary">โบนัส</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <td>50</td>
                    <td>5%</td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td>100</td>
                    <td>10%</td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>150</td>
                    <td>15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">ระบุจำนวนเงิน (10 - 10,000)</span>
              </label>
              <input
                type="range"
                min="10"
                max="10000"
                bind:value
                on:range={value}
                class="range"
                disabled
                aria-label="10-10000"
              />
              <input
                type="number"
                placeholder="Type here"
                class="input input-bordered input-secondary w-full max-w-xs"
                bind:value
              />
            </div>
            {#if value < 10 || value > 10000}
              <p class="badge badge-secondary">
                จำนวนเงินไม่ถูกต้อง (10-10000)
              </p>
            {:else}
              <div class="badge badge-secondary badge-lg">
                ได้รับ {value} DP และ {value / 10} RP
              </div>
            {/if}
          </div>
        {/if}
        {#if activeTabIndex == 1}
          <div class="flex justify-center">
            <div class="h-96 carousel carousel-vertical">
              {#each topupimg as images}
                <div class="carousel-item">
                  <img src={images} alt="วิธีเติมเงิน" class="h-96" />
                </div>
              {/each}
            </div>
          </div>
        {/if}
        <div class="tabs tabs-boxed flex justify-center">
          {#each tabs as tab, index}
            <p
              class="tab text-2xl"
              class:tab-active={activeTabIndex == index}
              on:click={() => (activeTabIndex = index)}
              aria-hidden="true"
            >
              {tab}
            </p>
          {/each}
        </div>
      </div>

      <!-- End Recommend -->
      <div class="">
        <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
          เติมเงิน
        </h1>
        <p class="text-md">ผ่านช่องทาง Truemoney (ระบบซองของขวัญ)</p>
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
              <button
                title="คลิก"
                class="btn btn-disabled text-lg text-red-300"
              >
                กรอกลิงก์ซองของขวัญให้ถูกต้อง
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="modal-action">
      <button title="คลิก" class="btn flex grow">ปิดหน้าต่างนี้</button>
    </div>
  </form>
</dialog>
