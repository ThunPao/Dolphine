<!-- ShopItems.svelte -->
<script>
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
        // shop_id: 1,
        title: "",
        rcon_command: "",
        visibled: true,
      },
    ];
  }
  async function saveCommands(shop_id) {
    try {
      const shopid = shop_id;
      const response = await fetch(
        `http://127.0.0.1:3005/addcmd?shop_id=${shopid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commands),
        }
      );

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
      const response = await fetch("http://localhost:3005/shopitems", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
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

<h1>Add Shop Item</h1>
<!-- <form on:submit|preventDefault={handleSubmit}> -->
<div class="grid justify-center gap-2 mx-2">
  <input
    type="text"
    placeholder="Name"
    bind:value={name}
    required
    class="input w-full"
  />

  <textarea
    class="textarea"
    placeholder="Description"
    bind:value={description}
    required
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

  <!-- <div class="grid justify-center gap-2 bg-base-200 rounded-lg p-2">
      Commands:

      <div class="flex gap-1">
        <input
          type="text"
          placeholder="ชื่อคำสั่ง"
          class="input input-bordered input-primary w-1/2 input-sm"
          bind:value={cmd_title}
        />
        <input
          type="text"
          placeholder="Type command %username%"
          class="input input-bordered input-secondary w-full max-w-xs input-sm"
          bind:value={cmd_command}
        />
        <input type="checkbox" class="toggle toggle-lg" checked />
      </div>
      <div class="flex justify-center">
        <button class="btn btn-wide btn-success">Add More</button>
      </div>
    </div> -->
  <div class="grid justify-center gap-2 bg-base-200 rounded-lg p-2">
    <h2 class="text-center font-bold text-lg mb-2">Commands:</h2>

    {#each commands as command, index}
      <div class="flex gap-1" key={index}>
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
      <button class="btn btn-wide btn-success" on:click={addMore}
        >Add More</button
      >
      <!-- <button class="btn btn-wide btn-primary" on:click={saveCommands}
        >Save Commands</button
      > -->
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
  <!-- handleSubmit -->
  <button class="btn btn-primary" type="submit" on:click={handleSubmit}
    >Add Item</button
  >
</div>
<!-- </form> -->
{#if message}
  <p>{message}</p>
{/if}
