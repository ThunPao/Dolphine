<script lang="ts">
  import type { RedeemCode } from "@models/redeemcodes";
  import { onMount } from "svelte";
  import CRUDModal from "./RedeemcodeCRUD.svelte";
  import {
    redeemcodesStore,
    redeemcodeController,
    formatDatetime,
  } from "@controllers/adminController";

  let tableHeaders: (keyof RedeemCode)[] = [];
  let selectedItem: RedeemCode[] = [];
  let isEditMode: boolean;

  // Create a writable store for redeemcodes
  tableHeaders = ["code", "commands"];

  function AddRedeemCode() {
    selectedItem = [
      {
        id: 0,
        code: "",
        toggle_status: 1,
        expires_at: null,
        uses_limit: null,
        uses_count: 0,
        commands: [],
        created_at: null,
        updated_at: null,
      },
    ];
    isEditMode = false;
    //@ts-ignore
    RedeemCodeForm.showModal();
  }

  function EditRedeemCode(item: RedeemCode) {
    // selectedItem = [item];
    selectedItem = [
      {
        id: item.id,
        code: item.code,
        toggle_status: item.toggle_status,
        expires_at: item.expires_at
          ? formatDatetime(String(item.expires_at))
          : null,
        uses_limit: item.uses_limit,
        uses_count: item.uses_count,
        commands: item.commands,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    ];
    isEditMode = true;
    //@ts-ignore
    RedeemCodeForm.showModal();
  }

  let searchQuery = "";

  onMount(async () => {
    await redeemcodeController.fetchRedeemCodes();
  });
  // Fetch redeem codes when the component is mounted
</script>

<dialog id="RedeemCodes" class="modal">
  <form method="dialog" class="modal-box text-center max-w-7xl">
    <h3 class="font-bold text-4xl mb-2">
      <i class="fa-solid fa-barcode" /> Redeem Code
    </h3>
    <div class="join">
      <input
        type="text"
        placeholder="ค้นหาโค๊ด"
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
          {#each $redeemcodesStore
            .filter((item) => item.code
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
            .slice(0, 15) as item (item.code)}
            <tr>
              {#each tableHeaders as header}
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <td
                  class="px-4 py-2"
                  tabindex="0"
                  on:click={() => {
                    EditRedeemCode(item);
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
          AddRedeemCode();
        }}
      >
        Add Code
      </button>

      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
<CRUDModal {selectedItem} EditMode={isEditMode} />
