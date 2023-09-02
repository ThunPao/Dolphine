<script lang="ts">
  import type { RedeemCode } from "../../../models/redeemcodes";
  import { apiurl } from "../../../services/apiurl";
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";
  import { onMount } from "svelte";

  onMount(()=>{
  flatpickr(".date-input", {
    enableTime: true, // This enables time selection
    dateFormat: "Y-m-d H:i", // Customize the date and time format
    position: "above center"
  });
  })


  export let selectedItem: RedeemCode[] = [];
  export let EditMode: boolean = false;

  let toggles = false;

  function handleToggles() {
    toggles = !toggles;
    if (!toggles) {
      selectedItem[0].toggle_status = 0;
    } else {
      selectedItem[0].toggle_status = 1;
    }
  }

  let limitedtoggle = false;
  function handleLimited() {
    limitedtoggle = !limitedtoggle;
    if (!limitedtoggle) {
      selectedItem[0].uses_limit = 0;
    } else {
      selectedItem[0].uses_limit = null;
    }
  }

  // ... Other functions ...
  async function updateCommands(shop_id: number) {
    // ... Your implementation ...
  }

  function addMore() {
    if (selectedItem.length > 0) {
      selectedItem[0].commands = [
        ...selectedItem[0].commands,
        {
          title: "",
          rcon_command: "",
          visibled: true, // Assuming 'visibled' is a string value
        },
      ];
    }
  }

  function removeCommand(index: number) {
    selectedItem[0].commands = selectedItem[0].commands.filter(
      (_, i) => i !== index
    );
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("code", selectedItem[0].code);
    formData.append("toggle_status", String(selectedItem[0].toggle_status));
    formData.append("uses_limit", String(selectedItem[0].uses_limit));
    formData.append("commands", JSON.stringify(selectedItem[0].commands)); // Serialize the array

    try {
      const response = await fetch(
        apiurl + "crudRedeem/" + selectedItem[0].id,
        {
          method: "PUT",
          body: formData,
        }
      );

      // ... Your implementation ...
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addItem() {
    const requestData = {
      code: selectedItem[0].code,
      toggle_status: selectedItem[0].toggle_status,
      uses_limit: selectedItem[0].uses_limit,
      expires_at: String(selectedItem[0].expires_at),
      commands: selectedItem[0].commands,
    };

    try {
      const response = await fetch(apiurl + "crudRedeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log(requestData);
        // location.reload();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function removeRedeemCode() {
    try {
      const redeemCodeId = selectedItem[0].id;
      const response = await fetch(apiurl + `crudRedeem/${redeemCodeId}`, {
        method: "DELETE",
      });

      // ... Your implementation ...
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<dialog id="RedeemCodeForm" class="modal">
  {#if selectedItem != null && selectedItem.length > 0}
    <form method="dialog" class="modal-box max-w-5xl">
      <p class="font-bold text-4xl">
        {EditMode ? "จัดการรหัสแลก" : "เพิ่มรหัสแลก"}
      </p>
      {#if EditMode}
        <button
          class="btn btn-sm btn-error absolute right-2 top-2"
          on:click={removeRedeemCode}>ลบรหัสแลก</button
        >
      {/if}
      {#if selectedItem != null && selectedItem.length > 0}
        <div class="bg-base-200 p-2">
          <div class="grid gap-2">
            <input
              type="text"
              placeholder="Code"
              bind:value={selectedItem[0].code}
              class="input input-info w-full mt-2"
            />

            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text lg:text-lg">แสดงโค๊ด</span>
                <input
                  type="checkbox"
                  class="toggle toggle-lg toggle-warning"
                  on:change={handleToggles}
                  checked={toggles}
                />
              </label>
            </div>
            {#if limitedtoggle}
              <input
                type="number"
                placeholder="จำกัดการใช้งาน"
                bind:value={selectedItem[0].uses_limit}
                class="input input-info w-full mt-2"
                disabled={!limitedtoggle}
              />
            {/if}

            <label class="label cursor-pointer">
              <span class="label-text lg:text-lg">จำกัดการใช้งาน</span>
              <input
                type="checkbox"
                class="toggle toggle-secondary toggle-lg"
                on:change={handleLimited}
              />
            </label>
            วันที่หมดอายุ
            <!-- <input
              type="date"
              placeholder="Expires Date"
              bind:value={selectedItem[0].expires_at}
              class="input w-full max-w-xs input-sm"
            /> -->
            <input
              type="text"
              class="date-input appearance-none bg-white border border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Select a date and time"
              bind:value={selectedItem[0].expires_at}
            />
            {selectedItem[0].expires_at}

            {#each selectedItem[0].commands as command, index (index)}
              <div class="grid lg:flex gap-1">
                <span
                  aria-hidden="true"
                  class="btn btn-error btn-sm hidden lg:block"
                  on:click={() => removeCommand(index)}>ลบ</span
                >
                <input
                  type="text"
                  placeholder="Title"
                  class="input input-bordered input-primary lg:w-1/2 input-sm"
                  bind:value={command.title}
                />
                <input
                  type="text"
                  placeholder="RCON Command"
                  class="input input-bordered input-secondary w-full max-w-xs input-sm"
                  bind:value={command.rcon_command}
                />
                <div class="flex justify-between">
                  Visible:
                  <input
                    type="checkbox"
                    class="toggle toggle-lg"
                    bind:checked={command.visibled}
                  />
                  <span
                    aria-hidden="true"
                    class="btn btn-error btn-sm lg:hidden"
                    on:click={() => removeCommand(index)}>ลบคำสั่ง</span
                  >
                </div>
              </div>
            {/each}

            <div class="flex justify-center">
              <span
                class="btn btn-success w-11/12"
                on:click={addMore}
                aria-hidden="true"
                >{selectedItem[0].commands.length > 0
                  ? "เพิ่มอีก"
                  : "เพิ่ม"}</span
              >
            </div>

            <div class="flex justify-between mt-2">
              {#if !EditMode}
                {#if selectedItem[0].code.length > 0 && selectedItem[0].commands.length > 0}
                  <button
                    class="btn btn-primary w-8/12"
                    type="submit"
                    on:click={addItem}>เพิ่ม {selectedItem[0].code}</button
                  >
                  <button class="btn w-4/12">ยกเลิก</button>
                {:else}
                  <button class="btn w-full">ปิด</button>
                {/if}
              {:else}
                <button class="btn btn-primary w-8/12" on:click={handleSubmit}>
                  แก้ไข {selectedItem[0].code}
                </button>
                <button class="btn w-4/12">ปิด</button>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </form>
  {/if}
</dialog>
