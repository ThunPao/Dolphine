<script>
    export let blog;
    import { database } from './firebase';
    import { ref, remove } from 'firebase/database';
  
    async function deleteBlog() {
      const blogRef = ref(database, 'blogs/' + blog.id);
  
      try {
        await remove(blogRef);
        console.log('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog: ', error);
      }
    }
  </script>
  
  <div class="blog-item">
    <h2>{blog.title}</h2>
    <p>{blog.content}</p>
    <button on:click={deleteBlog}>Delete</button>
  </div>
  
  <style>
    /* Add your styles here */
  </style>
  