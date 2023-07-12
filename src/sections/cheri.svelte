<script lang="ts">
  import { onMount } from "svelte";
  import type { Counter } from "../model/shopitem";
  import {apiurl} from '../services/apiurl';

  let counters: Counter[] = [];

  async function getCounters() {
    try {
      const response = await fetch(apiurl+"counters");
      counters = await response.json();
    } catch (error) {
      console.error("Error fetching counters:", error);
    }
  }

  async function updateCounter(id: number) {
    const counter = counters.find((c) => c.id === id);
    if (counter) {
      counter.INCR += 1;

      // Update the data on the server
      try {
        await fetch(apiurl+`counters/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(counter),
        });

        // Update the displayed data by fetching the updated counters
        await getCounters();
      } catch (error) {
        console.error("Error updating counter:", error);
      }
    }
  }

  onMount(getCounters);
</script>

<main>
  {#if counters.length > 0}
    {#each counters as counter}
      <div>
        <h1>Counter ID: {counter.id}</h1>
        <h2>INCR: {counter.INCR}</h2>
        <button class="btn" on:click={() => updateCounter(counter.id)}
          >Increase</button
        >
      </div>
    {/each}
  {:else}
    <p>Loading counters...</p>
  {/if}
</main>
