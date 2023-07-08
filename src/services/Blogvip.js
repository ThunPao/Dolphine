import { writable } from "svelte/store";
export let blogsvip = writable(null);
let token = localStorage.getItem("token");
var url = "http://127.0.0.1:3005/";

export async function getblogsvip(token) {
    try {
      const response = await fetch(url + "blogvip", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
      if (!response.ok) {
        console.log("Fetching failed: " + response);
        throw new Error("Request failed");
      }
      const responseData = await response.json();
    //   blogsvip = responseData.slice(0, 5);

      blogsvip.set(responseData);
    } catch (error) {
      console.error(error);
    }
  }
  if(token){
    getblogsvip(token);
    // console.log("BLOG VIP LOADED")
  }else{
    blogsvip.set(null);
    // console.log("NULL TOKEN")
  }