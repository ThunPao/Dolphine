// admincontroller.ts
import type { RedeemCode } from "@models/redeemcodes";
import { apiurl } from "@services/apiurl";
import type { ShopItem } from "@models/shopitems";
import { writable } from "svelte/store";
export const redeemcodesStore = writable<RedeemCode[]>([]);

export function formatDatetime(datetime: string) {
  const date = new Date(datetime);
  const formattedDate = date.toISOString().slice(0, 16);
  return formattedDate;
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
  this.tableHeaders = ["name", "point", "buycount","commands"];
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




