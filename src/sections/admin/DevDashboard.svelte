<script lang="ts">
  import { onMount } from "svelte";

  export let isAuth: boolean = false;
  let authpwd = "";
  import {
    authController,
    playerController,
    redeemcodesStore,
    shopitemStore,
    playerStore,
    topupController,
    topupList,
  } from "@controllers/adminController";
  async function checkAuth() {
    isAuth = await authController.getAuthadmin();
  }
  onMount(async () => {
    await checkAuth();
  });
  onMount(async () => {
    await playerController.fetchPlayers();
    await topupController.getTopupall();
  });
</script>

{#if !isAuth}
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content">
      <div class="max-w-md">
        
          <div class="join join-vertical justify-center gap-y-2 text-center mb-10">
            <!-- <div class="avatar">
              <div
                class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <img src="images/DPicon.webp" alt="DDD" />
              </div>
            </div> -->
            <div class="text-4xl font-medium">
              Dolphine DevDash
            </div>
            <div class="text-lg font-bold text-warning">
              Are you really my manager?
            </div>
        </div>
        <!-- <form
        > -->
          <div class="join">
            <input
              class="input input-bordered join-item"
              placeholder="รหัสผ่าน"
              type="password"
              bind:value={authpwd}
            />
            <button
            on:click={async () => {
              await authController.authAdmin(authpwd);
            }}
              class="btn btn-secondary join-item rounded-r-full">ล็อคอิน</button
            >
          </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
{:else}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div class="grid grid-cols-2 md:stats shadow">
    
    <div class="stat" onclick="Topuplist.showModal()">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
      </div>
      <div class="stat-title">ยอดการเติมเงิน</div>
      <div class="stat-value">
        {$topupList.reduce((total, item) => total + item.amounts, 0)}
      </div>
      <div class="stat-desc">
        {$topupList.reduce((total, item) => total + item.topup_point, 0)} DP
      </div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          /></svg
        >
      </div>
      <div class="stat-title">ไอดีผู้เล่น</div>
      <div class="stat-value">{$playerStore.length}</div>
      <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
    </div>
    <div class="stat" onclick="Shopitem.showModal()">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          /></svg
        >
      </div>
      <div class="stat-title">สินค้า</div>
      <div class="stat-value">{$shopitemStore.length}</div>
      <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
    </div>
    <div class="stat" onclick="RedeemCodes.showModal()">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          /></svg
        >
      </div>
      <div class="stat-title">รหัสแลกรับ</div>
      <div class="stat-value">{$redeemcodesStore.length}</div>
      <div class="stat-desc">↘︎ 90 (14%)</div>
    </div>
    
  </div>
{/if}
