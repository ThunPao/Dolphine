<script lang="ts">
  import { onMount } from "svelte";
  import { shopItemsController } from "../../../controllers/adminController";
  import ShopModal from "./ShopitemCRUD.svelte";
  import type { ShopItem } from "../../../models/shopitems";
  let dataLoaded = false;

  onMount(async () => {
    await shopItemsController.getShopItems();
    dataLoaded = true; // Set dataLoaded to true when data is loaded
  });
  let selectedItem = shopItemsController.selectedItem;
  let isEditMode: boolean;

  function EditShopItem(item: ShopItem) {
    selectedItem = [item];
    shopItemsController.editShopItem(item);
    isEditMode = true;
    // console.log(shopItemsController.selectedItem);
  }

  function AddShopitem() {
    selectedItem = [
      {
        id: 0,
        name: "",
        description: "",
        limits: -1,
        buycount: null,
        commands: [],
        point: null,
        href: null,
        sale_date: null,
        expired_date: null,
        toggled: "false",
      },
    ];
    isEditMode = false;
    shopItemsController.addShopItem();
  }
  let searchQuery = "";
</script>

<dialog id="Shopitem" class="modal">
  <form method="dialog" class="modal-box text-center max-w-7xl">
    <h3 class="font-bold text-4xl"><i class="fa-solid fa-tag" /> Shopitem</h3>
    <div class="join">
      <input
        type="text"
        placeholder="ค้นหาไอเทม"
        class="input input-bordered w-full max-w-xs join-item"
        bind:value={searchQuery}
      />
      <span
        aria-hidden="true"
        class="btn btn-error join-item rounded-r-full"
        on:click={() => {
          searchQuery = "";
        }}>ล้าง</span
      >
    </div>
    {#if dataLoaded}
      <div class="overflow-x-auto overscroll-y-auto h-96">
        <table class="table">
          <thead>
            <tr>
              {#each shopItemsController.tableHeaders as header}
                <th class="px-4 py-2">{header}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each shopItemsController.shopitems
              .filter((item) => item.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))
              .slice(0, 15) as item (item.id)}
              <tr>
                {#each shopItemsController.tableHeaders as header}
                  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                  <td
                    class="px-4 py-2"
                    tabindex="0"
                    on:click={() => {
                      EditShopItem(item);
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
    {/if}
    <div class="modal-action">
      <button
        aria-hidden="true"
        class="btn btn-success"
        on:click={() => {
          AddShopitem();
        }}
      >
        เพิ่มสินค้า
      </button>

      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
<ShopModal {selectedItem} EditMode={isEditMode} />
