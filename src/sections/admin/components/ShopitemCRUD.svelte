<script lang="ts">
  import type { ShopItem } from "../../../models/shopitems";
  import { apiurl, imgurl } from "../../../services/apiurl";
  export let selectedItem: ShopItem[] = [];
  export let EditMode: boolean = false;

  let limitedsale = false;
  // let limits: number | null = null;
  // let toggled = false;
  let image: File | null = null;
  function handleLimited() {
    limitedsale = !limitedsale;
    if (!limitedsale) {
      selectedItem[0].limits = -1;
    } else {
      selectedItem[0].limits = null;
    }
  }

  export function resetimg() {
    image = null;
    const input = document.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  function handleShow() {
    selectedItem[0].toggled = !selectedItem[0].toggled;
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

  function removeItem(index: number) {
    selectedItem[0].commands = selectedItem[0].commands.filter(
      (_, i) => i !== index
    );
  }

  function showImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      image = file;
      // selectedItem[0].href = image.name.split(".").slice(0, -1).join(".") + ".webp";
    }
  }

  async function updateCommands(shop_id: number) {
    try {
      const shopid = shop_id;
      const response = await fetch(apiurl + `updatecmds/${shopid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commands: selectedItem[0].commands }),
      });
      console.log("RAW :" + JSON.stringify(selectedItem[0].commands));

      if (response.ok) {
        // Data updated successfully
        console.log("RES :" + JSON.stringify(response.body));

        console.log("Commands updated successfully.");
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("name", selectedItem[0].name);
    formData.append("description", selectedItem[0].description);
    formData.append("limits", String(selectedItem[0].limits)); // Convert to string
    formData.append("buycount", String(selectedItem[0].buycount)); // Convert to string
    formData.append("point", String(selectedItem[0].point)); // Convert to string
    formData.append("sale_date", selectedItem[0].sale_date || ""); // Handle null or undefined
    formData.append("expired_date", selectedItem[0].expired_date || ""); // Handle null or undefined
    formData.append("image", image || ""); // Handle null or undefined
    formData.append("toggled", selectedItem[0].toggled ? "true" : "false");
    formData.append("href", selectedItem[0].href || ""); // Handle null or undefined
    formData.append("width", "464"); // Convert to string
    formData.append("height", "387"); // Convert to string
    formData.append("quality", "67"); // Convert to string

    try {
      const response = await fetch(apiurl + "shopitems/" + selectedItem[0].id, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        updateCommands(data.id);
        // message = `Shop item updated with ID: ${data.id}`;
        // location.reload();
      } else {
        // message = "Error updating shop item";
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
      // message = "An error occurred";
    }
  }
  async function saveCommands(shop_id: number) {
    try {
      const response = await fetch(apiurl + "addcmd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop_id: shop_id,
          commands: selectedItem[0].commands,
        }),
      });
      console.log("RAW ADD :" + JSON.stringify(selectedItem[0].commands));
      if (response.ok) {
        // Data inserted successfully
        console.log("Commands added successfully.");
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }

  async function addItem() {
    const formData = new FormData();
    formData.append("name", selectedItem[0].name);
    formData.append("description", selectedItem[0].description);
    formData.append("limits", String(selectedItem[0].limits)); // Convert to string
    formData.append("buycount", String(selectedItem[0].buycount)); // Convert to string
    formData.append("point", String(selectedItem[0].point)); // Convert to string
    formData.append("sale_date", selectedItem[0].sale_date || ""); // Handle null or undefined
    formData.append("expired_date", selectedItem[0].expired_date || ""); // Handle null or undefined
    formData.append("image", image || ""); //
    formData.append("toggled", selectedItem[0].toggled ? "true" : "false"); // Convert boolean to string
    formData.append(
      "href",
      image ? image.name.split(".").slice(0, -1).join(".") + ".webp" : ""
    ); // Handle null or undefined
    formData.append("width", "464"); // Convert to string
    formData.append("height", "387"); // Convert to string
    formData.append("quality", "67"); // Convert to string

    try {
      const response = await fetch(apiurl + "shopitems", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("ID: " + data.id + " FORM: " + formData);

      if (response.ok) {
        saveCommands(data.id);
        location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function removeshopitem() {
    try {
      const shopid = selectedItem[0].id;
      const response = await fetch(apiurl + `shopitems/${shopid}`, {
        method: "DELETE",
      });
      const data = response.json();
      if (response.ok) {
        location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<dialog id="ShopitemForm" class="modal">
  <form method="dialog" class="modal-box max-w-5xl">
    <p class="font-bold text-4xl">จัดการสินค้า</p>
    <button
      class="btn btn-sm btn-error absolute right-2 top-2"
      on:click={removeshopitem}>ลบไอเทม</button
    >
    <div class="grid grid-cols-2 justify-center gap-2 mx-2">
      {#if selectedItem != null && selectedItem.length > 0}
        <div>
          <input
            type="text"
            placeholder="Name"
            bind:value={selectedItem[0].name}
            class="input w-full"
          />

          <textarea
            class="textarea"
            placeholder="Description"
            bind:value={selectedItem[0].description}
          />
          <div class="join gap-2">
            <input
              type="number"
              placeholder="Buy Count"
              bind:value={selectedItem[0].buycount}
              class="input w-full"
            />
            <input
              type="number"
              placeholder="Point"
              bind:value={selectedItem[0].point}
              class="input w-full"
            />
          </div>
          <input
            type="number"
            placeholder="Limits"
            bind:value={selectedItem[0].limits}
            class="input w-full"
            disabled={!limitedsale}
          />
          <div class="join justify-center gap-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text text-lg">จำกัดการขาย</span>
                <input
                  type="checkbox"
                  class="toggle toggle-secondary toggle-lg"
                  on:change={handleLimited}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text text-lg">แสดงไอเทม</span>
                <input
                  type="checkbox"
                  class="toggle toggle-info toggle-lg"
                  bind:checked={selectedItem[0].toggled}
                />
                {typeof selectedItem[0].toggled}
                <!-- on:change={handleShow} -->
              </label>
            </div>
          </div>
          <div class="collapse bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium text-center">
              คำสั่งทั้งหมด : {selectedItem[0].commands.length > 0
                ? selectedItem[0].commands.length
                : "Empty"}
            </div>
            <div class="collapse-content">
              <div class="grid justify-center gap-2 bg-base-200 rounded-lg p-2">
                <h2 class="text-center font-bold text-lg mb-2">จัดการคำสั่ง</h2>
                {#each selectedItem[0].commands as command, index}
                  <div class="flex gap-1">
                    <span
                      aria-hidden="true"
                      class="btn btn-error btn-sm"
                      on:click={() => removeItem(index)}>ลบ</span
                    >
                    <input
                      type="text"
                      placeholder="title"
                      class="input input-bordered input-primary w-1/2 input-sm"
                      bind:value={command.title}
                    />
                    <input
                      type="text"
                      placeholder="rcon_command"
                      class="input input-bordered input-secondary w-full max-w-xs input-sm"
                      bind:value={command.rcon_command}
                    />
                    <input
                      type="checkbox"
                      class="toggle toggle-lg"
                      bind:checked={command.visibled}
                    />
                    {typeof command.visibled}
                  </div>
                {/each}

                <div class="flex justify-center">
                  <span
                    class="btn btn-wide btn-success"
                    on:click={addMore}
                    aria-hidden="true"
                    >{selectedItem[0].commands.length > 0
                      ? "Add more"
                      : "Add first command"}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="flex">
            Start
            <input
              type="date"
              placeholder="Sale Date"
              bind:value={selectedItem[0].sale_date}
              class="input w-full max-w-xs input-sm"
            />
            End
            <input
              type="date"
              placeholder="Expired Date"
              bind:value={selectedItem[0].expired_date}
              class="input w-full max-w-xs input-sm"
            />
          </div>
        </div>
        <div>
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            alt="Uploaded Image"
            src={EditMode && selectedItem[0].href
              ? imgurl + selectedItem[0].href
              : selectedItem[0].href && selectedItem[0].href.length <= 4
              ? imgurl + "default.webp"
              : image
              ? URL.createObjectURL(image)
              : imgurl + "default.webp"}
            width="464"
            height="387"
          />
          <input
            type="file"
            class="file-input file-input-info w-full"
            on:change={showImage}
          />

          <div class="flex justify-between">
            {#if !EditMode}
              {#if selectedItem[0].name.length > 0 && selectedItem[0].description.length > 0 && selectedItem[0].commands.length > 0 && image}
                <button
                  class="btn btn-primary w-8/12"
                  type="submit"
                  on:click={addItem}
                  >เพิ่ม {selectedItem[0].name}
                </button>
                <button class="btn w-4/12">ยกเลิก</button>
              {:else}
                <button class="btn w-full" on:click={resetimg}>ปิด</button>
              {/if}
            {:else}
              <button class="btn btn-primary w-8/12" on:click={handleSubmit}
                >แก้ไข {selectedItem[0].name}
              </button>
              <button class="btn w-4/12">ปิด</button>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </form>
</dialog>
