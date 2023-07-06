import toastr from "toastr";
import { writable } from "svelte/store";


let token = localStorage.getItem("token");

export let tokencheck = writable(localStorage.getItem("token"));

// Create a writable store for the password field value
export const password = writable('');


export function handleLogout() {
  token = null;
  localStorage.removeItem("token");
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
      localStorage.removeItem("token"); // Remove the token from localStorage
      tokencheck.set(null);
      toastr.success("Logged out.", "ออกจากระบบเรียบร้อย", {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      });
    } else {
      localStorage.removeItem("token"); // Remove the token from localStorage
      tokencheck.set(null);
        // console.log("Logout failed");
      // Logout failed
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