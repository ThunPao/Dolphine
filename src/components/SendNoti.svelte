<script>
  import { onMount, afterUpdate } from "svelte";

  export let types;
  export let title;
  export let description;
  export let duration;

  let show = true;

  // Auto-hide the alert after the specified duration
  onMount(() => {
    if (duration) {
      setTimeout(() => {
        show = false;
      }, duration);
    }
  });

  afterUpdate(() => {
    if (!show) {
      // Execute any cleanup logic after the alert is hidden (e.g., removing it from the DOM)
    }
  });

  function getAlertClasses() {
    const baseClasses =
      "p-4 rounded-lg text-white font-semibold z-100 flex justify-bottom";

    if (types === "success") {
      return `${baseClasses} bg-green-500`;
    } else if (types === "warning") {
      return `${baseClasses} bg-orange-500`;
    } else if (types === "danger") {
      return `${baseClasses} bg-red-500`;
    }

    // Default to success type if no valid type is provided
    return `${baseClasses} bg-green-500`;
  }
</script>

{#if show}
  <div class={getAlertClasses()}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{title}</span>
    <p>{description}</p>
  </div>
{/if}
