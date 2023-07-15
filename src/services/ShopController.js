import toastr from "toastr";
import { writable } from "svelte/store";
import { token,handleLoadinfo } from "../services/Authen";
import {apiurl} from "../services/apiurl";

export let shopitems = writable(null);

// async function handleclick() {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     console.log("Delayed log after 0.5 seconds");
//   }

  export async function buyitem(id) {
    const url = apiurl+'buyitem/'+id;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    });
    if (response.ok) {
        const data = await response.json();
        handleLoadinfo();
        getshopitems();
        // location.reload();
        toastr.success(
            ""+ data.message,
            "สำเร็จ!",
             {
              timeOut: 5000,
              positionClass: "toast-bottom-center",
              newestOnTop: true,
              progressBar: true,
            }
          );
      } else {
        toastr.warning(
            ""+ data.message,
            "ซื้อสินค้าไม่สำเร็จ!",
            {
              timeOut: 5000,
              positionClass: "toast-bottom-center",
              newestOnTop: true,
              progressBar: true,
            }
          );
      }
  }

  export async function getshopitems() {
    try {
      const response = await fetch(apiurl + "shopitems");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      shopitems.set(responseData);
  shopitems.update(items => [...items].sort((a, b) => b.buycount - a.buycount));
      
      return shopitems;
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }