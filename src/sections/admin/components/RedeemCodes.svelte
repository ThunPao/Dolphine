<script lang="ts">
  import type { RedeemCode } from "../../../models/redeemcodes";
  import { writable } from "svelte/store";
  import { apiurl } from "../../../services/apiurl";
  import { onMount } from "svelte";

  let tableHeaders: (keyof RedeemCode)[] = [];
  // let selectedItem: RedeemCode[] = [];

  // Create a writable store for redeemcodes
  const redeemcodesStore = writable<RedeemCode[]>([]);

  async function fetchRedeemCodes() {
    try {
      const response = await fetch(apiurl + "crudRedeem");
      const data = await response.json();
      // Filter the data to include only the required fields
      const filteredData: RedeemCode[] = data.map((item: RedeemCode) => ({
        code: item.code,
        toggle_status: item.toggle_status,
        uses_limit: item.uses_limit,
        uses_count: item.uses_count,
        commands: item.commands,
      }));
      redeemcodesStore.set(filteredData);
      tableHeaders = Object.keys(data[0]) as (keyof RedeemCode)[];
    } catch (error) {
      console.error("Error fetching redeem codes:", error);
    }
  }
  onMount(async () => {
    await fetchRedeemCodes();
  });
  // Fetch redeem codes when the component is mounted
</script>

<dialog id="RedeemCodes" class="modal">
  <form method="dialog" class="modal-box text-center max-w-7xl">
    <h3 class="font-bold text-4xl">Redeem Code</h3>
    <div class="overflow-x-auto overscroll-y-auto h-96">
      <table class="table">
        <thead>
          <tr>
            {#each tableHeaders as header}
              <th class="px-4 py-2">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each $redeemcodesStore as item (item.code)}
            <tr>
              {#each tableHeaders as header}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <td
                  class="px-4 py-2"
                  tabindex="0"
                  on:click={() => {
                    // EditRedeemCode(item);
                  }}
                  aria-hidden="true"
                >
                  {#if header === "commands"}
                    <div class="grid gap-2 justify-center text-center">
                      {#each item[header] as command}
                        <div class="rounded-md bg-base-200 px-2">
                          {command.title}
                        </div>
                      {/each}
                    </div>
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
    <div class="modal-action">
      <button
        aria-hidden="true"
        class="btn btn-success"
        on:click={() => {
          // AddRedeemCode();
        }}
      >
        Add Code
      </button>

      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
