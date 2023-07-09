import { writable } from "svelte/store";
export let blogsvip = writable(null);
export let blogdata = writable(null);
export let blogdata_p = writable(null);

let token = localStorage.getItem("token");
var url = "http://127.0.0.1:3005/";

export async function getblogdata() {
  try {
    const response = await fetch(url + "blogdata");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const responseData = await response.json();
    blogdata.set(responseData);
    // data = await response.json(); //showall
  } catch (error) {
    console.error(error);
  }
}
export async function getblogsvip(datatoken) {
    try {
      const response = await fetch(url + "blogvip", {
    headers: {
      'Authorization': `Bearer ${datatoken}`
    }
  });
      if (!response.ok) {
        // console.log("Fetching failed: " + response);
        // throw new Error("Request failed");
      }
      if(response.status == 401){
      // console.log("You are not authorized")
      }
      const responseData = await response.json();
    //   blogsvip = responseData.slice(0, 5);

      blogsvip.set(responseData);
    } catch (error) {
      // console.error(error);
    }
  }


  export async function getblogdataplayer(token) {
    try {
    // let currentid = $currentuser != null ? $currentuser[0].id : '';
      const response = await fetch(url + "blogdatap", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      // blogdata_p = responseData.slice(0, 5);
      blogdata_p.set(responseData);
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  if(token){
    getblogdataplayer(token);

      getblogsvip(token);



      
  }else{
    blogsvip.set(null);
    blogdata_p.set(null);
    // console.log("NULL TOKEN")
  }

  export async function toggleFavorite(blogId) {
    try {
      token = localStorage.getItem("token");
      // Make a POST request to the server
      const response = await fetch(url + "blogdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ blog_id: blogId }),
      });

      // Check the response status

      if (response.ok) {
        getblogdata();
        // getblogdataplayer();
        if(token)
        {
          getblogdataplayer(token);
        }
        // If the request is successful, update the local blogdata array
      } else {
        // If the request fails, display an error message
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }