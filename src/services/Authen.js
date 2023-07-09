import toastr from "toastr";
import { writable } from "svelte/store";
import {blogsvip,getblogsvip,getblogdataplayer,blogdata_p} from "./Blogdatas";
import Swal from 'sweetalert2'
import '@sweetalert2/theme-borderless/borderless.scss';

let token = localStorage.getItem("token");

let reglogin = false;
export const reguser = writable('');
export const regpwd = writable('');
export const regpwdcf = writable('');
let reg_username;
let reg_password;

// Subscribe to changes in the reguser store
const unsubscribeUsername = reguser.subscribe(value => {
  reg_username = value;
});

// Subscribe to changes in the regpwd store
const unsubscribePassword = regpwd.subscribe(value => {
  reg_password = value;
});


export const tokencheck = writable(localStorage.getItem('token'));

// Create a writable store for the password field value
export const password = writable('');
export let currentuser = writable(null);


async function getPlayerInfo(token) {
  const url = 'http://127.0.0.1:3005/playerinfo';
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    currentuser.set(data);
    // tokencheck.set(writable(localStorage.getItem("token")));

    // currentuser.subscribe((p) => {
    //   console.log(p[0]);
    // });

    
    return data;
  } else {
    currentuser.set(null);
    tokencheck.set(null);
    console.log("You are not authorized to access");

    // throw new Error('Failed to retrieve player info.');
  }
}


if(token){
  getPlayerInfo(token);
}else{
  currentuser.set(null);
}


export function notlogin(){
  Swal.fire({
    title: 'กรุณาล็อคอิน',
    icon: 'error',
    timer: 2000,
    timerProgressBar: true,
  })
}




function handleLogout() {
  token = null;
  localStorage.removeItem("token");
  currentuser.set(null);
  tokencheck.set(null);
  blogsvip.set(null);
  blogdata_p.set(null);
  //
reguser.set('');
regpwd.set('');
regpwdcf.set('');
}
export async function logout() {
  password.set('');
    const response = await fetch("http://127.0.0.1:3005/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the authentication bearer token
      },
    });

    if (response.ok) {
        // console.log("Logout successful");
      // Logout successful
      handleLogout();
      toastr.success("Logged out.", "ออกจากระบบเรียบร้อย", {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
    } else {
      toastr.error("เกิดข้อผิดพลาด", "Error", {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
    }
  }
  export async function handleLogin() {
    
      const username = reglogin ? reg_username : document.getElementById("username").value;
      const password = reglogin ? reg_password : document.getElementById("password").value;


    const response = await fetch("http://127.0.0.1:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // console.log(data);
      token = data.token;
      localStorage.setItem("token", token);
      tokencheck.set(writable(data.token));
      getPlayerInfo(data.token);
      getblogsvip(data.token);
      getblogdataplayer(data.token);
      // Display an info toast with no title
      if (reglogin){
        reglogin = false
        reguser = '';
        regpwd = '';
      } 

      toastr.success(
        "Successful Login.",
        "เข้าสู่ระบบสำเร็จ " + username,
        {
          timeOut: 5000,
          positionClass: "toast-bottom-center",
          newestOnTop: true,
          progressBar: true,
        }
      );
      Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'คุณ '+ username,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      })
    } else {
      toastr.error("Error.", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
      // console.error(data.error);
    }
  }
  // handleRegister
  export async function handleRegister() {
    const username = document.getElementById('regusername').value;
    const password = document.getElementById('regpassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;



    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Make the API POST request
    const response = await fetch('http://127.0.0.1:3005/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      reguser.set(username);
      regpwd.set(password);
      reglogin = true;
      unsubscribeUsername();
unsubscribePassword();
      // Registration successful
      const data = await response.json();
      // console.log('Registration successful:', data);
      handleLogin();
    } else {
      toastr.error("Error.", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
      // Registration failed
      const errorData = await response.json();
      console.error('Registration failed:', errorData.error);
    }
  }