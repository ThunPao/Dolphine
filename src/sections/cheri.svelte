<script lang="ts">
  import { onMount } from "svelte";

  //   type Post = {
  //     createdAt: Date;
  //     image: any;
  //     content: string;
  //     title: string;
  //     id: number;
  //   };

  type counter = {
    incr: string;
    id: number;
  };

  let items: counter[] = [];
  let loaded = false;

  onMount(() => loadThings(false));

  function loadThings(wait: boolean) {
    if (typeof fetch !== "undefined") {
      loaded = false;

      fetch("http://127.0.0.1:3005/counters")
        .then((response) => response.json())
        .then((json) =>
          setTimeout(
            () => {
              console.log("items" + items);
              items = json;
              loaded = true;
            },
            // Simulate a long load time.
            wait ? 2000 : 0
          )
        );
    }
  }
</script>

<table class="table-bordred">
  {items}
  {loaded}
</table>
