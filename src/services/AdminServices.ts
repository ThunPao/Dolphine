import {apiurl} from "./apiurl";

export async function getshopitems() {
    try {
      const response = await fetch(apiurl + "shopitems");
      if (!response.ok) {
        if(response.status === 429) {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
        throw new Error("Request failed");
      }
      const responseData = await response.json();

      return responseData;
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }