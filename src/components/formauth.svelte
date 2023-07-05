<script>
  import { onMount } from 'svelte';
  import toastr from "toastr";

  let token = localStorage.getItem('token');

  async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:3005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      token = data.token;
      localStorage.setItem('token', token);
          // Display an info toast with no title
    toastr.success(
      "Successful Login.",
      "ยินดีต้อนรับ " + data.username + "p_role"+data.p_role,
      {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      }
    );
    } else {
      console.error(data.error);
    }
  }

  function handleLogout() {
    token = null;
    localStorage.removeItem('token');
  }

  onMount(() => {
    if (token) {
      // Token exists in localStorage, you can perform necessary actions
      // to set the user as logged in, such as fetching user data.
      // You can also redirect the user to a logged-in area of your app.
      console.log('User is logged in');
    } else {
      console.log('User is logged out');
    }
  });
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="loginuser_pop" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg text-center">ระบบสมาชิก</h3>

    <div
      class="hidden gallery flex gap-4 items-center snap-x snap-mandatory overflow-x-scroll"
    >
      <div class="gallery__item min-w-[75%] snap-center">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
      <div class="snap-center gallery__item min-w-[75%]">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
      <div class="gallery__item min-w-[75%] snap-center">
        <img
          src="images/dpbg.png"
          alt="IMG"
          class="gallery__image object-cover w-[100%] h-[100%]"
        />
      </div>
    </div>
    <div class="grid gap-3 justify-center text-center">
      <h1 class="font-bold text-4xl">Dolphine</h1>
      <h4>เข้าสู่ระบบ</h4>
      ชื่อในเกมส์
      รหัสผ่าน

      <div class="join grid gap-3">
        <input
          type="text"
          id="username"
          placeholder="Username"
          class="input input-bordered w-full max-w-xs"
        />
      
        <input
          type="password"
          id="password"
          placeholder="Password"
          class="input input-bordered w-full max-w-xs"
        />
      
        <button class="btn btn-accent" on:click={handleLogin}>LOG-IN</button>
      </div>



    </div>

    <!-- <p class="py-4">กดปุ่ม <kbd class="kbd">ESC</kbd> เพื่อปิด</p> -->
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
