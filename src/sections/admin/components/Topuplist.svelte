<script lang="ts">
  import { topupList, topupController,Showdate } from "@controllers/adminController";
  let searchQueryt = "";
  import type { TopupList } from "@models/Topuplist";

  let tableHeaders: (keyof TopupList)[] = [];

  // Create a writable store for redeemcodes
  tableHeaders = ["playername", "amounts","topup_point","created_at"];
</script>

    <h3 class="font-bold text-4xl mb-2">
      <i class="fa-solid fa-barcode" /> ประวัติการเติมเงิน
    </h3>
    <div class="join">
      <input
        type="text"
        placeholder="ค้นหาโค๊ด"
        class="input input-bordered w-full max-w-xs join-item"
        bind:value={searchQueryt}
      />
      <span
        aria-hidden="true"
        class="btn btn-error join-item rounded-r-full"
        on:click={() => {
          searchQueryt = "";
        }}>ล้าง</span
      >
    </div>
    <div class="overflow-x-auto overscroll-y-auto h-96 text-lg">
      <table class="table">
        <thead>
          <tr>
            {#each tableHeaders as header}
              <th class="px-4 py-2">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each $topupList
            .filter((item) => item.playername
                .toLowerCase()
                .includes(searchQueryt.toLowerCase()))
            .slice(0, 15) as item}
            <tr>
              {#each topupController.tableHeaders as header}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <td class="px-4 py-2" tabindex="0" aria-hidden="true">
                  {#if header === "created_at"}
                    {Showdate(item[header])}
                  {:else}
                    {item[header]}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
   

