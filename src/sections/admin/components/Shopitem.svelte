<script lang="ts">
  import { onMount } from "svelte";
  import { getshopitems } from "../../../services/AdminServices"; // Correct the import path
  import type { ShopItem } from "../../../models/shopitems";
  import ShopModal from "./ShopitemCRUD.svelte";

  let shopitems: ShopItem[] = [];
  let tableHeaders: (keyof ShopItem)[] = [];
  let selectedItem: ShopItem[] = [];

  onMount(async () => {
    try {
      shopitems = await getshopitems();
      tableHeaders = Object.keys(shopitems[0]) as (keyof ShopItem)[];
    } catch (error) {
      console.error(error);
    }
  });

  function handleClick(item: ShopItem) {
    selectedItem = [item];
    console.log(selectedItem);
  }
</script>

<dialog id="Shopitem" class="modal">
  <form method="dialog" class="modal-box text-center max-w-5xl">
    <h3 class="font-bold text-4xl">Shopitem</h3>

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
          {#each shopitems.slice(0, 9) as item (item.id)}
            <tr>
              {#each tableHeaders as header}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td
                  class="px-4 py-2"
                  tabindex="0"
                  on:click={() => {
                    handleClick(item);
                    ShopitemForm.showModal();
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
      <additem
        for="Add_shopitem"
        class="btn btn-success"
        onclick="ShopitemForm.showModal()"
        >เพิ่มสินค้า
      </additem>
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
<ShopModal {selectedItem} />
