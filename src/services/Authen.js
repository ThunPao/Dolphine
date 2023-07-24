import toastr from "toastr";
import { writable } from "svelte/store";
import {blogsvip,getblogsvip,getblogdataplayer,blogdata_p} from "./Blogdatas";
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import {apiurl} from "../services/apiurl";
import {shopitems} from "../services/ShopController";



export let token = localStorage.getItem("token");



let reglogin = false;
export let reguser = writable('');
export let regpwd = writable('');
export let regpwdcf = writable('');
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

    // tokencheck.set(writable(localStorage.getItem("token")));

    // currentuser.subscribe((p) => {
    //   console.log(p[0]);
    // });


export async function getPlayerInfo(token) {
  const url = apiurl+'playerinfo';

  // Check if the token is expired
  const isTokenExpired = () => {
    if(token){
      const decodedToken = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
    }else{
      return null;
    }

  };

    // Token is expired, refresh the page

  if (isTokenExpired()) {
    location.reload();
    Swal.fire({
      title: 'TOKEN EXPIRED!',
      icon: 'error',
      timer: 2000,
      timerProgressBar: true,
    })
    return;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    currentuser.set(data);
    return data;
  } else {
    if(token){
      token = null;
      localStorage.removeItem("token");
    tokencheck.set(null);
    location.reload();
    }
    if(currentuser){
      currentuser.set(null);
    }

    // handleLogout();
    console.log("You are not authorized to access");
  }
}


if(token){
handleLoadinfo();

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
export async function handleLoadinfo(){
  const data = await getPlayerInfo(token);
  currentuser.set(data);
  if(data.p_role > 1){
    getblogsvip(token);
  }
}


export function updateplayerinfo(id) {

  // Subscribe to the 'shopitems' store to get the actual array data
  let shopItemsData;
  const unsubscribe = shopitems.subscribe(value => {
    shopItemsData = value;
  });

  // Find the item with the provided id from the shop items data
  const selectedItem = shopItemsData.find(item => item.id === id);

  if (selectedItem) {
    // Calculate the new point for the current user by decreasing the point based on the selected item
    const newPoint = currentuser.point - selectedItem.point;
    // Update the point of the current user in the currentuser store
    currentuser.update(user => ({ ...user, point: newPoint }));

    // Unsubscribe from the 'shopitems' store to avoid memory leaks
    unsubscribe();
  }
}


export async function logout() {
  password.set('');
    const response = await fetch(apiurl+"logout", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the authentication bearer token
      },
    });

    if (response.ok) {
        // console.log("Logout successful");
      // Logout successful
      handleLogout();
      toastr.success("Logged out.", "ออกจากระบบเรียบร้อย", {
        timeOut: 3000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
    } else {
      toastr.error("เกิดข้อผิดพลาด", "Error", {
        timeOut: 3000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
    }
  }
  export async function handleLogin() {
    
      const username = reglogin ? reg_username : document.getElementById("username").value;
      const password = reglogin ? reg_password : document.getElementById("password").value;


    const response = await fetch(apiurl+"login", {
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
      // getPlayerInfo(data.token);
      handleLoadinfo();
if(currentuser?.p_role > 1){
  getblogsvip(data.token);
}
      
      getblogdataplayer(data.token);
      // Display an info toast with no title
      if (reglogin){
        reglogin = false
        reguser.set('');
regpwd.set('');
regpwdcf.set('');
      } 

      toastr.success(
        "Successful Login.",
        "เข้าสู่ระบบสำเร็จ " + username,
        {
          timeOut: 3000,
          positionClass: "toast-bottom-center",
          newestOnTop: true,
          progressBar: true,
        }
      );
      Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'คุณ '+ username,
        icon: 'success',
        timer: 1000,
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
    const response = await fetch(apiurl+'register', {
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