import toastr from "toastr";
import { writable } from "svelte/store";
import {blogsvip} from "../services/Blogvip";
import {getblogsvip} from "../services/Blogvip";



let token = localStorage.getItem("token");

export let tokencheck = writable(localStorage.getItem("token"));

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
    // currentuser.subscribe((p) => {
    //   console.log(p);
    // });
    
    return data;
  } else {
    tokencheck.set(writable(localStorage.getItem("token")));
    currentuser.set(null);
    console.log("You are not authorized to access");
    // throw new Error('Failed to retrieve player info.');
  }
}


if(token){
  getPlayerInfo(token)
}else{
  currentuser.set(null);

}







function handleLogout() {
  token = null;
  localStorage.removeItem("token");
  currentuser.set(null);
  tokencheck.set(null);
  blogsvip.set(null);
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
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

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
      tokencheck.set(writable(localStorage.getItem("token")));
      getPlayerInfo(data.token);
      getblogsvip(data.token);
      // Display an info toast with no title
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