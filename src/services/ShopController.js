import toastr from "toastr";
import { writable } from "svelte/store";
import { token,handleLoadinfo,updateplayerinfo } from "../services/Authen";
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
        // 'Content-Type': 'application/json', if body using this
        'Authorization': `Bearer ${token}`
      },

    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data.message);
        
      toastr.warning(
          ""+ data.message,
          "ซื้อสินค้าไม่สำเร็จ!",
          {
            timeOut: 3000,
            positionClass: "toast-bottom-center",
            newestOnTop: true,
            progressBar: true,
          }
        );
      } else {
          const data = await response.json();
          // handleLoadinfo();
          updateplayerinfo(id);
          // getshopitems();
          updateShopItem(id);
          // location.reload();
          toastr.success(
              ""+ data.message,
              "สำเร็จ!",
               {
                timeOut: 3000,
                positionClass: "toast-bottom-center",
                newestOnTop: true,
                progressBar: true,
              }
            );
      }
  }

  function updateShopItem(id) {
    shopitems.update(items => {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          const newBuyCount = item.buycount + 1; // Increase buycount by 1
          const newLimits = item.limits - 1; // Decrease limits by 1
          return { ...item, buycount: newBuyCount, limits: newLimits };
        }
        return item;
      });
      return updatedItems;
    });
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