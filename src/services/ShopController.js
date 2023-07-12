import toastr from "toastr";
import { token,handleLoadinfo } from "../services/Authen";
import {refreshshopitems} from "../sections/cards.astro";
import {apiurl} from "../services/apiurl";

async function handleclick() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Delayed log after 0.5 seconds");
  }

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
        refreshshopitems();
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
  


