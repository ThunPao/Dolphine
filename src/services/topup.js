import {apiurl} from "../services/apiurl";
import Swal from 'sweetalert2';
import {token,handleLoadinfo} from '../services/Authen';

export async function topup(){
    Swal.fire({
        title: 'กำลังรับข้อมูล กรุณารอสักครู่...',
        icon: 'info',
        timer: 10000,
        timerProgressBar: true,
      })
    const voucherurl = document.getElementById("voucherurl").value;
    const response = await fetch(apiurl+"topup", {
      method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ voucherurl }),
      });
      const data = await response.json();
      if (response.ok) {
        handleLoadinfo();
        Swal.fire({
            title: data.message,
            icon: 'success',
            timer: 5000,
            timerProgressBar: true,
          })
      } else {

        Swal.fire({
            title: data.error,
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
          })
      }
}