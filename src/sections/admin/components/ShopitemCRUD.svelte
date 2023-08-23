<script lang="ts">
  import type { ShopItem } from "../../../models/shopitems";
  import { apiurl, imgurl } from "../../../services/apiurl";

  export let selectedItem: ShopItem[] = [];
  export let EditMode: boolean = false;
  export let clearimg: boolean = false;

  let limitedsale = false;
  let limits: number | null = null;
  let toggled = false;
  let image: File | null = null;

  function handleLimited() {
    limitedsale = !limitedsale;
    if (!limitedsale) {
      limits = -1;
    } else {
      limits = null;
    }
  }

  function handleShow() {
    toggled = !toggled;
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
    console.log(index, "Removed REF:" + index);
  }

  // let imageSrc: string | null = null;
  function showImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      selectedItem[0].href = URL.createObjectURL(file);
    }
  }
</script>

<dialog id="ShopitemForm" class="modal">
  <form method="dialog" class="modal-box">
    <p class="font-bold text-4xl">CRUD Shopitem</p>
    <div class="grid justify-center gap-2 mx-2">
      {#if selectedItem != null && selectedItem.length > 0}
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
                on:change={handleShow}
              />
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
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          alt="Uploaded Image"
          src={image
            ? URL.createObjectURL(image)
            : selectedItem[0].href !== null
            ? imgurl + selectedItem[0].href
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
              <button class="btn btn-primary w-8/12" type="submit"
                >เพิ่ม {selectedItem[0].name}
              </button>
              <button class="btn w-4/12">ยกเลิก</button>
            {:else}
              <button class="btn w-full">ปิด</button>
            {/if}
          {:else}
            <button class="btn btn-primary w-8/12"
              >แก้ไข {selectedItem[0].name}
            </button>
            <button class="btn w-4/12">ปิด</button>
          {/if}
        </div>
      {/if}
    </div>

    Msg
  </form>
</dialog>
