import toastr from "toastr";
import { currentuser } from "../services/Authen";

async function handleclick() {
    // Display an info toast with no title
    toastr.success(
      "Success!",
      "ซื้อสินค้า " + title + " สำเร็จ ยอดเงินคงเหลือ " + currentuser?.points,
      {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Delayed log after 0.5 seconds");
  }

  export function buyitem(did) {
    console.log("Buyed "+did);
    // Display an info toast with no title
    toastr.success(
      "Success!",
      "ซื้อสินค้า title "+ " สำเร็จ ยอดเงินคงเหลือ " + currentuser?.points,
      {
        timeOut: 5000,
        positionClass: "toast-bottom-center",
        newestOnTop: true,
        progressBar: true,
      }
    );
  }