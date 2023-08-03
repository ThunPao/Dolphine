<script>
  import { onMount } from "svelte";
  import BlogItem from "./BlogItem.svelte";
  import { database } from "./firebase";
  import { ref, get, remove, onValue } from "firebase/database";

  const dataRef = ref(database, "blogs");
  let blogs = [];

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
</script>

<div class="blogs-list pt-10">
  <div class="blog-item">
    <table class="table">
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
              <button class="btn btn-error" on:click={deleteBlog(blog.id)}
                >Delete</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* Add your styles here */
</style>
