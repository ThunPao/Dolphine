<script>
  import { onMount } from "svelte";
  let tabs = ["อันดับ #1", "ไอเทมยอดนิยม", "อันดับ #3"];
  let activeTabIndex = 1;

  //
  let data = null;
  let buymost = null;

  const LIMIT = 5;

  async function fetchData() {
    try {
      const response = await fetch(
        "http://universities.hipolabs.com/search?country=United+States"
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      data = responseData.slice(0, LIMIT);
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  async function shoptop() {
    try {
      const response = await fetch("http://127.0.0.1:3005/shoptop");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      buymost = responseData.slice(0, LIMIT);
      // data = await response.json(); //showall
    } catch (error) {
      console.error(error);
    }
  }

  // Call the fetch function when the component is mounted
  onMount(fetchData);
  onMount(shoptop);
  //

  console.log(
    "%cWarning: Unauthorized access!",
    "color: red; font-size: 20px;"
  );
</script>

<div class="tabs d-flex justify-center">
  {#each tabs as tab, index}
    <a
      class="tab tab-bordered"
      class:tab-active={activeTabIndex == index}
      on:click={() => (activeTabIndex = index)}
    >
      {tab}
    </a>
  {/each}
</div>

{#if activeTabIndex == 0}
  <table class="table">
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
    <tbody>
      <!-- row loop -->
      {#if data !== null}
        {#if data.length > 0}
          {#each data as item, index}
            <tr>
              {#if index === 0}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
              {:else if index === 1}
                <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
              {:else if index === 2}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
              {:else}
                <th />
              {/if}

              <td>{item.country}</td>
              <td>{item.name}</td>
            </tr>
          {/each}
        {:else}
          <p>No data available.</p>
        {/if}
      {:else}
        {#each Array(5) as _, i}
          <tr class="animate-pulse">
            {#if i === 0}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
            {:else if i === 1}
              <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
            {:else if i === 2}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
            {:else}
              <th />
            {/if}
            <td>
              <div class="h-4 bg-slate-700 rounded" />
            </td>
            <td>
              <div class="h-3 bg-slate-700 rounded" />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
{/if}

{#if activeTabIndex == 1}
  <table class="table">
    <thead>
      <tr>
        <th />
        <th>ไอเทม</th>
        <th>จำนวน</th>
      </tr>
    </thead>
    <tbody>
      <!-- row loop -->
      {#if buymost !== null}
        {#if buymost.length > 0}
          {#each buymost as item, index}
            <tr>
              {#if index === 0}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
              {:else if index === 1}
                <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
              {:else if index === 2}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
              {:else}
                <th />
              {/if}

              <td>{item.name}</td>
              <td>{item.buycount}</td>
            </tr>
          {/each}
        {:else}
          <p>ไม่มีข้อมูล.</p>
        {/if}
      {:else}
        {#each Array(5) as _, i}
          <tr class="animate-pulse">
            {#if i === 0}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
            {:else if i === 1}
              <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
            {:else if i === 2}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
            {:else}
              <th />
            {/if}
            <td>
              <div class="h-4 bg-slate-700 rounded" />
            </td>
            <td>
              <div class="h-3 bg-slate-700 rounded" />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>{/if}

{#if activeTabIndex == 2}
  <div>content 3</div>
{/if}
