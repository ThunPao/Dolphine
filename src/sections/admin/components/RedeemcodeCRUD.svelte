<script lang="ts">
    import type { RedeemCode } from "../../../models/redeemcodes";
    import { apiurl } from "../../../services/apiurl";
    
    export let selectedItem: RedeemCode[] = [];
    export let EditMode: boolean = false;
  
    let limitedsale = false;
    let image: File | null = null;
  
    function handleLimited() {
      limitedsale = !limitedsale;
      if (!limitedsale) {
        selectedItem[0].uses_limit = -1;
      } else {
        selectedItem[0].uses_limit = null;
      }
    }
  
    // ... Other functions ...
  
    async function updateCommands(shop_id: number) {
      // ... Your implementation ...
    }
  
    async function handleSubmit() {
      const formData = new FormData();
      formData.append("code", selectedItem[0].code);
      formData.append("toggle_status", String(selectedItem[0].toggle_status));
      formData.append("uses_limit", String(selectedItem[0].uses_limit));
      formData.append("rcon_command", selectedItem[0].rcon_command || ""); // Handle null or undefined
  
      try {
        const response = await fetch(apiurl + "crudRedeem/" + selectedItem[0].id, {
          method: "PUT",
          body: formData,
        });
        
        // ... Your implementation ...
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    async function addItem() {
      const formData = new FormData();
      formData.append("code", selectedItem[0].code);
      formData.append("toggle_status", String(selectedItem[0].toggle_status));
      formData.append("uses_limit", String(selectedItem[0].uses_limit));
      formData.append("rcon_command", selectedItem[0].rcon_command || ""); // Handle null or undefined
  
      try {
        const response = await fetch(apiurl + "crudRedeem", {
          method: "POST",
          body: formData,
        });
  
        // ... Your implementation ...
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    async function removeRedeemCode() {
      try {
        const redeemCodeId = selectedItem[0].id;
        const response = await fetch(apiurl + `crudRedeem/${redeemCodeId}`, {
          method: "DELETE",
        });
        
        // ... Your implementation ...
      } catch (error) {
        console.error("Error:", error);
      }
    }
  </script>
  
  <dialog id="RedeemCodeForm" class="modal">
    <form method="dialog" class="modal-box max-w-5xl">
      <!-- ... Your form content ... -->
    </form>
  </dialog>
  