<script>
    import { database } from './firebase';
    import { ref, push } from 'firebase/database';
  
    let title = '';
    let content = '';
  
    async function add() {
      const dataRef = ref(database, 'blogs'); // Replace 'blogs' with your desired path
      const newBlog = {
        title: title,
        content: content,
      };
  
      try {
        await push(dataRef, newBlog);
        console.log('Blog added successfully');
        // Clear input fields after adding
        title = '';
        content = '';
      } catch (error) {
        console.error('Error adding blog: ', error);
      }
    }
  </script>
  
  <div class="new-blog-form">
    <h2>Add New Blogs</h2>
    <label>
      Title:
      <input bind:value={title} />
    </label>
    <label>
      Content:
      <textarea bind:value={content}></textarea>
    </label>
    <button class="btn btn-primary" on:click={add}>Add Blog</button>
  </div>
  
  <style>
    /* Add your styles here */
  </style>
  