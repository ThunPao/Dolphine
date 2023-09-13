<script lang="ts">
  import type { RedeemCode } from "@models/redeemcodes";
  import { apiurl } from "@services/apiurl";
  import { redeemcodesStore } from "@controllers/adminController";
  import { getCookie } from "@services/cookiemanager";
  const token = getCookie("blyatnakuy");
  let toggles = false;

  export let selectedItem: RedeemCode[] = [];
  export let EditMode: boolean = false;

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
    if (token) {
      const requestData = {
        code: selectedItem[0].code,
        toggle_status: selectedItem[0].toggle_status,
        uses_limit: selectedItem[0].uses_limit,
        expires_at: String(selectedItem[0].expires_at),
        commands: selectedItem[0].commands,
      };
      try {
        const response = await fetch(
          apiurl + "crudRedeem/" + selectedItem[0].id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          }
        );
        if (response.ok) {
          console.log(requestData);
          // location.reload();
        } else {
          console.log(response);
        }
        // ... Your implementation ...
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  async function addItem() {
    if (token) {
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log(requestData);
          // location.reload();

          const updatedItem = selectedItem[0];
          redeemcodesStore.update((currentValue: RedeemCode[]) => {
            // Use map to create a new array with the updated item
            return currentValue.map((item: RedeemCode) => {
              // Check if the item matches the updated item by some unique identifier (e.g., id)
              if (item.id === updatedItem.id) {
                // Update the item with the new values from updatedItem
                return updatedItem;
              }
              // If the item doesn't match, return it unchanged
              return item;
            });
          });
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  async function removeRedeemCode() {
    if (token) {
      try {
        const redeemCodeId = selectedItem[0].id;
        console.log(redeemCodeId);
        const response = await fetch(apiurl + `crudRedeem/${redeemCodeId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          location.reload();
        } else {
          console.log(response);
        }

        // ... Your implementation ...
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
</script>

<dialog id="RedeemCodeForm" class="modal">
  {#if selectedItem != null && selectedItem.length > 0}
    <form method="dialog" class="modal-box max-w-5xl">
      <p class="font-bold text-4xl">
        {EditMode ? "จัดการรหัสแลก" : "เพิ่มรหัสแลก"}
      </p>
      <!-- <input
        id="Expiretime"
        type="text"
        class="input"
        placeholder="Select a date and time"
        bind:value={selectedItem[0].expires_at}
        readonly
      /> -->
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
              />
            {/if}
            <label class="label cursor-pointer">
              <span class="label-text lg:text-lg">จำกัดการใช้งาน</span>
              <input
                type="checkbox"
                class="toggle toggle-secondary toggle-lg"
                on:change={handleLimited}
                checked={selectedItem[0].uses_limit &&
                selectedItem[0].uses_limit > 0
                  ? true
                  : false}
              />
            </label>
            วันที่หมดอายุ
            <input
              type="datetime-local"
              class="input"
              placeholder="Select a date and time"
              bind:value={selectedItem[0].expires_at}
            />
            <h2 class="text-center font-bold text-lg mb-2">จัดการคำสั่ง</h2>
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
