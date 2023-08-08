<script>
  let width = "";
  let height = "";
  let quality = "";
  let selectedFile = null;
  let imgRealName = null;
  let uploadedImage = "https://via.placeholder.com/464x387";

  async function handleUpload() {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("quality", quality);
    formData.append("storagePath", selectedFile.name);

    try {
      const response = await fetch("http://localhost:3005/uploadimg", {
        method: "POST",
        body: formData,
        headers: {
          // Remove this line if it's causing issues
          //   "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        uploadedImage = `http://localhost:3005/images/${imgRealName}`;
      } else {
        console.error("Error uploading and converting image.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleFileChange(event) {
    selectedFile = event.target.files[0];
    imgRealName = selectedFile.name.split(".").slice(0, -1).join(".") + ".webp";
    // console.log("Selected file:", fileNameWithoutExtension);
  }
</script>

<div class="container mx-auto">
  <div class="flex-1 gap-2 justify-center">
    <p class="text-4xl font-medium text-white">Test Upload Image webp</p>
    <p>Adjust Size</p>
    <img src={uploadedImage} alt="Uploaded" />

    <div class="join gap-2 mt-2">
      <input
        bind:value={width}
        type="text"
        placeholder="Width"
        class="input w-1/2 max-w-xs"
      />
      <input
        bind:value={height}
        type="text"
        placeholder="Height"
        class="input w-1/2 max-w-xs"
      />
    </div>

    <p>Quality</p>
    <input
      bind:value={quality}
      type="text"
      placeholder="Quality"
      class="input w-full max-w-xs"
    />

    <input
      type="file"
      class="file-input file-input-info w-full max-w-xs"
      on:change={handleFileChange}
    />

    <button class="btn btn-secondary" on:click={handleUpload}>Upload</button>
  </div>
</div>
