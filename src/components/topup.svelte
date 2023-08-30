<script>
  import { topup } from "../services/topup.js";
  import { inputValue } from "../services/fieldcontrol.js";
  import { onMount, tick } from "svelte";
  import { apiurl } from "../services/apiurl";

  inputValue.set("");
  let topupimg = [
    "images/topup/step0.webp",
    "images/topup/step1.webp",
    "images/topup/step2.webp",
  ];
  let tabs = ["เรทการเติม", "อัตราแลกเปลี่ยน", "วิธีเติมเงิน"];
  let activeTabIndex = 0;
  let value = 10;
  let maxBonusPercent = 0;
  let prices = [10, 50, 100, 150, 300, 500, 1000, 3000, 10000];

  let topuprates = [];
  async function getTopuprates() {
    try {
      const url = apiurl + "topuprates";
      const response = await fetch(url, {});
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  function calculateBonus(inputValue) {
    maxBonusPercent = 0;
    for (const row of topuprates) {
      if (
        inputValue >= row.topup_amount &&
        row.bonus_percent > maxBonusPercent
      ) {
        maxBonusPercent = row.bonus_percent / 100; // Update max bonus percent if applicable
      }
    }
    return inputValue + inputValue * maxBonusPercent;
  }
  onMount(async () => {
    topuprates = await getTopuprates();
    await tick();
  });
</script>

<dialog
  id="topup"
  class="modal modal-middle place-items-end justify-center md:place-items-center md:justify-normal"
>
  <form method="dialog" class="modal-box text-center w-full max-w-5xl">
    <!-- Recommend -->
    <div class="grid lg:grid-cols-2">
      <div class="">
        {#if activeTabIndex == 0}
          <div class="w-full">
            <div class="text-xl font-bold">อัตราการเติมเงิน</div>
            <div class="overflow-x-auto h-72">
              <table class="table text-center text-2xl">
                <!-- head -->
                <thead class="sticky top-0 left-0 bg-base-100">
                  <tr class="text-3xl">
                    <th class="text-info">จำนวนเงินขั้นต่ำ</th>
                    <th class="text-secondary">โบนัส</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  {#if topuprates != null && topuprates.length > 0}
                    {#each topuprates as data}
                      <tr>
                        <td>{data.topup_amount}฿</td>
                        <td>{data.bonus_percent}%</td>
                      </tr>
                    {/each}
                  {/if}
                </tbody>
              </table>
            </div>
            <div class="">
              <!-- Old rate -->
            </div>
          </div>
        {/if}
        {#if activeTabIndex == 1}
          <p class="text-xl font-medium">คำนวณอัตราแลกเปลี่ยน</p>
          <div class="mx-1 overflow-x-auto justify-center">
            {#each prices as data}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="btn btn-outline btn-info m-1 text-lg"
                on:click={() => (value = data)}>{data}฿</span
              >
            {/each}
          </div>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <input
            type="range"
            min="10"
            max="10000"
            bind:value
            on:range={value}
            class="range"
            aria-label="10-10000"
          />
          <input
            type="number"
            placeholder="ระบุจำนวนเงิน (10 - 10000)"
            class="input input-bordered input-secondary w-full max-w-xs"
            bind:value
          />
          {#if value < 10 || value > 10000}
            <p class="badge badge-secondary">จำนวนเงินไม่ถูกต้อง (10-10000)</p>
          {:else}
            <div class="text-center mb-2">
              ได้รับ {calculateBonus(value)} DP และ {value / 10} RP
            </div>
          {/if}
        {/if}
        {#if activeTabIndex == 2}
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
      <div class="grid justify-center align-middle">
        <h1 class="font-bold text-4xl text-amber-400 dark:text-amber-200">
          เติมเงิน
        </h1>
        <p class="text-md lg:text-xl">ผ่านช่องทาง Truemoney (ซองของขวัญ)</p>
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
