
import { DateTime } from "luxon";
import { Settings } from "luxon";
import { onMount, onDestroy } from "svelte";

  // Set the locale to Thai
  Settings.defaultLocale = "th";

  export let dateDiff;
  let interval;

  onMount(() => {
    updateDateDiff(sale_date, expired_date); // Initial calculation
    interval = setInterval(updateDateDiff, 1000); // Update every 1 second
  });
  onDestroy(() => {
    clearInterval(interval);
  });

export function updateDateDiff(sale_date,expired_date) {
    if (sale_date && DateTime.fromISO(sale_date) > DateTime.local()) {
      dateDiff = "เริ่ม" + DateTime.fromISO(sale_date).toRelative();
    } else {
      if (expired_date && DateTime.local() < DateTime.fromISO(expired_date)) {
        dateDiff = "จบ" + DateTime.fromISO(expired_date).toRelative();
      }
    }
    return dateDiff;
  }