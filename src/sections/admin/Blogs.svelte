<script>
  import { onMount } from "svelte";
  import BlogItem from "./BlogItem.svelte";
  import { database } from "./firebase";
  import { ref, set, get, remove, onValue } from "firebase/database";

  const dataRef = ref(database, "blogs");
  let blogs = [];

  let blog_id, title, content;
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      blogs = Object.entries(data).map(([id, blog]) => ({ ...blog, id }));
    } else {
      blogs = [];
      console.log("No data available");
    }
  });
  async function deleteBlog(blogid) {
    const blogRef = ref(database, "blogs/" + blogid);

    try {
      await remove(blogRef);
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  }
  function setvalue(val1, val2, val3) {
    blog_id = val1;
    title = val2;
    content = val3;
  }
  async function editBlog(blogid) {
    const dataRef = ref(database, "blogs/" + blogid); // Replace 'blogs' with your desired path
    const newBlog = {
      title: title,
      content: content,
    };

    try {
      await set(dataRef, newBlog);
      console.log("Blog edit successfully");
      // Clear input fields after adding
      blog_id = "";
      title = "";
      content = "";
    } catch (error) {
      console.error("Error adding blog: ", error);
    }
  }
</script>

<div class="blogs-list pt-10">
  <div class="blog-item">
    <table class="table">
      {#if blogs.length > 0}
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {#each blogs as blog (blog.id)}
            <tr>
              <BlogItem {blog} />

              <td>
                <div class="join gap-1">
                  <button
                    class="btn btn-info btn-sm"
                    onclick="editblog.showModal()"
                    on:click={setvalue(blog.id, blog.title, blog.content)}
                    >Edit</button
                  >
                  <button
                    class="btn btn-error btn-sm"
                    on:click={deleteBlog(blog.id)}>Delete</button
                  >
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      {:else}
        <div class="flex text-center justify-center">
          <span class="text-2xl">Fetching</span>
          <span class="loading loading-infinity loading-lg" />
        </div>
      {/if}
    </table>
  </div>
</div>

<!-- Open the modal using ID.showModal() method -->
<dialog id="editblog" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-4xl text-info">Edit</h3>
    <div class="grid gap-1">
      <p class="py-4">Title</p>

      <input
        type="text"
        placeholder="title"
        bind:value={title}
        class="input input-bordered w-full max-w-xs"
      />
      <p class="py-4">Content</p>

      <input
        type="text"
        placeholder="content"
        bind:value={content}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="modal-action">
      <button
        class="btn btn-info"
        onclick="editblog.showModal()"
        on:click={editBlog(blog_id)}>Edit</button
      >
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

<style>
  /* Add your styles here */
</style>
