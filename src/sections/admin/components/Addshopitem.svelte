<!-- ShopItems.svelte -->
<script>
  import { apiurl } from "@services/apiurl";
  let name = "";
  let description = "";
  let limits = -1;
  let buycount = "";
  let point = "";
  let sale_date = null;
  let expired_date = null;
  let image = null;
  let href = "";
  let message = "";
  let toggled = false;
  let limitedsale = false;

  let commands = [];

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

  async function addMore() {
    commands = [
      ...commands,
      {
        title: "",
        rcon_command: "",
        visibled: true,
      },
    ];
  }
  function removeItem(index) {
    commands = commands.filter((_, i) => i !== index);
  }
  async function saveCommands(shop_id) {
    try {
      const shopid = shop_id;
      const response = await fetch(apiurl + `addcmd?shop_id=${shopid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
      });

      if (response.ok) {
        // Data inserted successfully
        // console.log("Commands added successfully.");
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("limits", limits);
    formData.append("buycount", buycount);
    formData.append("point", point);
    formData.append("sale_date", sale_date);
    formData.append("expired_date", expired_date);
    formData.append("image", image);
    formData.append("toggled", toggled);
    formData.append("href", href);
    formData.append("width", 464);
    formData.append("height", 387);
    formData.append("quality", 20);

    try {
      const response = await fetch(apiurl + "shopitems", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        saveCommands(data.id);
        message = `Shop item added with ID: ${data.id}`;
      } else {
        message = "Error adding shop item";
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
      message = "An error occurred";
    }
  }

  function handleFileChange(event) {
    image = event.target.files[0];
    href = image.name.split(".").slice(0, -1).join(".") + ".webp";
  }
</script>

<dialog id="Add_shopitem" class="modal">
  <form method="dialog" class="modal-box">
    <p class="font-bold text-4xl">Add Shopitem</p>
    <div class="grid justify-center gap-2 mx-2">
      <input
        type="text"
        placeholder="Name"
        bind:value={name}
        class="input w-full"
      />

      <textarea
        class="textarea"
        placeholder="Description"
        bind:value={description}
      />
      <div class="join gap-2">
        <input
          type="number"
          placeholder="Buy Count"
          bind:value={buycount}
          class="input w-full"
        />
        <input
          type="number"
          placeholder="Point"
          bind:value={point}
          class="input w-full"
        />
      </div>
      <input
        type="number"
        placeholder="Limits"
        bind:value={limits}
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
          Shop Commands : {commands.length > 0 ? commands.length : "Empty"}
        </div>
        <div class="collapse-content">
          <div class="grid justify-center gap-2 bg-base-200 rounded-lg p-2">
            <h2 class="text-center font-bold text-lg mb-2">Manage Commands</h2>
            {#each commands as command, index}
              <div class="flex gap-1" key={index}>
                <button
                  class="btn btn-error btn-sm"
                  on:click={() => removeItem(index)}>ลบ</button
                >
                <input
                  type="text"
                  placeholder="title"
                  class="input input-bordered input-primary w-1/2 input-sm"
                  bind:value={commands[index].title}
                />
                <input
                  type="text"
                  placeholder="rcon_command"
                  class="input input-bordered input-secondary w-full max-w-xs input-sm"
                  bind:value={commands[index].rcon_command}
                />
                <input
                  type="checkbox"
                  class="toggle toggle-lg"
                  bind:checked={commands[index].visibled}
                />
              </div>
            {/each}

            <div class="flex justify-center">
              <span
                class="btn btn-wide btn-success"
                on:click={addMore}
                aria-hidden="true"
                >{commands.length > 0 ? "Add more" : "Add first command"}</span
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
          bind:value={sale_date}
          class="input w-full max-w-xs input-sm"
        />
        End
        <input
          type="date"
          placeholder="Expired Date"
          bind:value={expired_date}
          class="input w-full max-w-xs input-sm"
        />
      </div>
      <input
        type="file"
        class="file-input file-input-info w-full"
        on:change={handleFileChange}
      />
      <div class="flex justify-between">
        {#if name.length > 0 && description.length > 0 && commands.length > 0 && image}
          <button
            class="btn btn-primary w-8/12"
            type="submit"
            on:click={handleSubmit}>เพิ่ม {name}</button
          >
          <button class="btn w-4/12">ยกเลิก</button>
        {:else}
          <button class="btn w-full">ปิด</button>
        {/if}
      </div>
    </div>
    {#if message}
      <p>{message}</p>
    {/if}
  </form>
</dialog>
