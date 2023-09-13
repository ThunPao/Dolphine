// admincontroller.ts
import type { RedeemCode } from "@models/redeemcodes";
import { apiurl } from "@services/apiurl";
import type { ShopItem } from "@models/shopitems";
import { writable } from "svelte/store";
import Swal from "sweetalert2";
export const redeemcodesStore = writable<RedeemCode[]>([]);
import { setCookie, getCookie } from "@services/cookiemanager";

export function formatDatetime(datetime: string) {
  const date = new Date(datetime);
  const formattedDate = date.toISOString().slice(0, 16);
  return formattedDate;
}
export const authController = {

  async authAdmin(password: string) {
    try {
      const response = await fetch(apiurl + "dpmauth_cykablyatnakuy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        Swal.fire(
          'เข้าสู่ระบบไม่สำเร็จ',
        )
        if (response.status === 429) {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
        throw new Error("Request failed");
      } else {
        // Swal.fire(
        //   'เข้าสู่ระบบสำเร็จ',
        // )
        location.reload();
      }
      const responseData = await response.json();
      const token = responseData.token; // Assuming the token is in the JSON response
      return setCookie('blyatnakuy', token, 7);
    } catch (error) {
      console.error(error);
    }
  },

  async getAuthadmin() {
    const token = getCookie("blyatnakuy");
    if (token) {
      try {
        const url = apiurl + 'dpminfo_cykablyatnakuy';
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (token) {
            Swal.fire({
              title: 'TOKEN EXPIRED!',
              icon: 'error',
              timer: 2000,
              timerProgressBar: true,
            });
          }
          return false;
        }

        // If the response is OK, return true directly
        return true;
      } catch (error: any) {
        console.error("Error:", error.message);
        return false;
      }
    } else {
      return false;
    }
  }

}

export const shopItemsController = {
  shopitems: [] as ShopItem[],
  tableHeaders: [] as (keyof ShopItem)[],
  selectedItem: [] as ShopItem[],
  isEditMode: false,

  async getShopItems() {
    try {
      const response = await fetch(apiurl + "allshopitems");
      if (!response.ok) {
        if (response.status === 429) {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      this.shopitems = responseData;
      // console.log(responseData);
      // this.tableHeaders = Object.keys(responseData[0]) as (keyof ShopItem)[];
      this.tableHeaders = ["name", "point", "buycount", "commands"];
    } catch (error) {
      console.error(error);
    }
  },
  editShopItem(item: ShopItem) {
    this.selectedItem = [item];
    this.isEditMode = true;
    // @ts-ignore
    ShopitemForm.showModal();
  },

  addShopItem() {
    // this.selectedItem = [
    //   {
    //     id: 0,
    //     name: "",
    //     description: "",
    //     limits: -1,
    //     buycount: 0,
    //     commands: [],
    //     point: 0,
    //     href: null,
    //     sale_date: null,
    //     expired_date: null,
    //     toggled: false,
    //   },
    // ];
    // this.isEditMode = false;
    // @ts-ignore
    ShopitemForm.showModal();
  },

  async removeshopitem(selectedItem: ShopItem[]) {
    try {
      const shopid = selectedItem[0].id;
      const response = await fetch(apiurl + `shopitems/${shopid}`, {
        method: "DELETE",
      });
      const data = response.json();
      if (response.ok) {
        location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

export const redeemcodeController = {
  async fetchRedeemCodes() {
    try {
      const response = await fetch(apiurl + "crudRedeem");
      const data = await response.json();
      // Filter the data to include only the required fields
      const filteredData: RedeemCode[] = data.map((item: RedeemCode) => ({
        id: item.id,
        code: item.code,
        toggle_status: item.toggle_status,
        uses_limit: item.uses_limit,
        uses_count: item.uses_count,
        expires_at: item.expires_at,
        commands: item.commands,
      }));
      return redeemcodesStore.set(filteredData);
      // tableHeaders = Object.keys(data[0]) as (keyof RedeemCode)[];
    } catch (error) {
      console.error("Error fetching redeem codes:", error);
    }
  }
}




