<script>
  import { database } from "./firebase";
  import { ref, push } from "firebase/database";

  let title = "";
  let content = "";

  async function add() {
    const dataRef = ref(database, "blogs"); // Replace 'blogs' with your desired path
    const newBlog = {
      title: title,
      content: content,
    };

    try {
      await push(dataRef, newBlog);
      console.log("Blog added successfully");
      // Clear input fields after adding
      title = "";
      content = "";
    } catch (error) {
      console.error("Error adding blog: ", error);
    }
  }
</script>

<div class="alert">
  <input
    type="text"
    placeholder="Title"
    bind:value={title}
    class="input input-bordered w-full max-w-xs"
  />
  <input
    type="text"
    placeholder="Content"
    bind:value={content}
    class="input input-bordered w-full max-w-xs"
  />
  <button class="btn btn-info" on:click={add}>Create</button>
</div>
