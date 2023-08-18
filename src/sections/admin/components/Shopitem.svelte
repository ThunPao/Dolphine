<script lang="ts">
  import { onMount } from "svelte";
  import { getshopitems } from "../../../services/AdminServices"; // Correct the import path
  import type { ShopItem } from "../../../models/shopitems";

  let shopitems: ShopItem[] = [];
  let tableHeaders: (keyof ShopItem)[] = [];

  onMount(async () => {
    try {
      shopitems = await getshopitems();
      tableHeaders = Object.keys(shopitems[0]) as (keyof ShopItem)[];
    } catch (error) {
      console.error(error);
    }
  });
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
                <td class="px-4 py-2">{item[header]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="modal-action">
      <button class="btn btn-success" onclick="Add_shopitem.showModal()"
        >เพิ่มสินค้า</button
      >
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

<style>
  /* Your modal and table styling here */
</style>
