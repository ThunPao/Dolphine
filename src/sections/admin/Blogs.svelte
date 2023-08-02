<script>
    import { onMount } from 'svelte';
    import BlogItem from './BlogItem.svelte';
    import { database } from './firebase';
    import { ref, get, onValue } from 'firebase/database';
  
    const dataRef = ref(database, 'blogs');
    let blogs = [];
  
    onValue(dataRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        blogs = Object.entries(data).map(([id, blog]) => ({ ...blog, id }));
      } else {
        blogs = [];
        console.log('No data available');
      }
    });
  </script>
  
  <div class="blogs-list pt-10">
    {#each blogs as blog (blog.id)}
      <BlogItem {blog} />
    {/each}
  </div>
  
  <style>
    /* Add your styles here */
  </style>
  