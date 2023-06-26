
<script>
  import { onMount } from 'svelte';
  let tabs = [ 'อันดับ #1', 'อันดับ #2', 'อันดับ #3']
  let activeTabIndex = 0


//
let data = null;
const LIMIT = 5;

async function fetchData() {
  try {
    const response = await fetch('http://universities.hipolabs.com/search?country=United+States');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const responseData = await response.json();
      data = responseData.slice(0, LIMIT);
      // data = await response.json(); //showall 
  } catch (error) {
    console.error(error);
  }
}

// Call the fetch function when the component is mounted
onMount(fetchData);
//



  </script>

{#if data !== null}
{#if data.length > 0}
  <ul>
    {#each data as item}
      <li>{item.country}</li>
    {/each}
  </ul>
{:else}
  <p>No data available.</p>
{/if}
{:else}
<p>Loading...</p>
{/if}



  <div class="tabs d-flex justify-center">
    {#each tabs as tab, index}
      <a
        class="tab tab-bordered" class:tab-active={activeTabIndex == index}
        on:click={()=>activeTabIndex = index}
      >
        {tab}
      </a>
    {/each}
  </div>
  
  
  
  {#if activeTabIndex == 0}

  <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#if data !== null}
{#if data.length > 0}
{#each data as item, index}
<tr>
  {#if index === 0}
  <th><i class="fa-solid fa-xl fa-trophy text-amber-400"></i></th>
{:else if index === 1}
<th><i class="fa-solid fa-xl fa-trophy text-zinc-300"></th>
  {:else if index === 2}
  <th><i class="fa-solid fa-xl fa-trophy text-amber-600"></i></th>
  {:else}
  <th></th>
  {/if}

  <td>{item.country}</td>
  <td>{item.name}</td>
</tr>
{/each}
        {:else}
  <p>No data available.</p>
{/if}
{:else}
<p>Loading...</p>
{/if}

        <!-- <tr>
          <th><i class="fa-solid fa-xl fa-trophy text-zinc-300"></th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
        </tr>

        <tr>
          <th><i class="fa-solid fa-xl fa-trophy text-amber-600"></i></th>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
        </tr> -->
      </tbody>
</table>

  {/if}
  
  {#if activeTabIndex == 1}
    <div>
      content 2
    </div>
  {/if}
  
  {#if activeTabIndex == 2}
    <div>
      content 3
    </div>
  {/if}
  