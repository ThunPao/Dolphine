<script lang="ts">
    import type { RedeemCode } from "../../../models/redeemcodes";
    import { apiurl } from "../../../services/apiurl";
    
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
    console.log(selectedItem[0].commands);
    selectedItem[0].commands = selectedItem[0].commands.filter(
      (_, i) => i !== index
    );
  }
  
    async function handleSubmit() {
    const formData = new FormData();
    formData.append('code', selectedItem[0].code);
    formData.append('toggle_status', String(selectedItem[0].toggle_status));
    formData.append('uses_limit', String(selectedItem[0].uses_limit));
    formData.append('commands', JSON.stringify(selectedItem[0].commands)); // Serialize the array
  
    try {
      const response = await fetch(apiurl + 'crudRedeem/' + selectedItem[0].id, {
        method: 'PUT',
        body: formData,
      });
      
      // ... Your implementation ...
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
    async function addItem() {
      const formData = new FormData();
      formData.append("code", selectedItem[0].code);
      formData.append("toggle_status", String(selectedItem[0].toggle_status));
      formData.append("uses_limit", String(selectedItem[0].uses_limit));
      formData.append("rcon_command", JSON.stringify(selectedItem[0].commands)); // Handle null or undefined
  
      try {
        const response = await fetch(apiurl + "crudRedeem", {
          method: "POST",
          body: formData,
        });
  
        // ... Your implementation ...
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
      <p class="font-bold text-4xl">{EditMode ? "จัดการรหัสแลก" : "เพิ่มรหัสแลก"}</p>
      {#if EditMode}
      <button
        class="btn btn-sm btn-error absolute right-2 top-2"
        on:click={removeRedeemCode}>ลบรหัสแลก</button
      >
      {/if}
        {#if selectedItem != null && selectedItem.length > 0}
        
          <div class="bg-base-200 p-2">
            <input
            type="text"
            placeholder="Code"
            bind:value={selectedItem[0].code}
            class="input input-info w-full mt-2"
          />

          <label>
            แสดงโค๊ด
            <input
              type="checkbox"
              class="toggle toggle-secondary toggle-lg"
              on:change={handleToggles}
              checked={toggles}
            />
  
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
  
              <span
              class="btn btn-wide btn-success"
              on:click={addMore}
              aria-hidden="true"
              >{selectedItem[0].commands.length > 0
                ? "Add more"
                : "Add first command"}</span
            >
              <div class="flex justify-between mt-2">
                {#if !EditMode}
                  {#if selectedItem[0].code.length > 0 && selectedItem[0].commands.length > 0}
                    <button
                      class="btn btn-primary w-8/12"
                      type="submit"
                      on:click={addItem}
                    >เพิ่ม {selectedItem[0].code}</button>
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
        {/if}
    </form>
    {/if}
  </dialog>
  