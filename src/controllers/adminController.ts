// admincontroller.ts
import type { RedeemCode } from "../models/redeemcodes";
import { apiurl } from "../services/apiurl";
import type { ShopItem } from "../models/shopitems";
import { writable } from "svelte/store";
export const redeemcodesStore = writable<RedeemCode[]>([]);

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
      this.tableHeaders = Object.keys(responseData[0]) as (keyof ShopItem)[];
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




