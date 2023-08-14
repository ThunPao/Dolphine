
import { DateTime,Settings } from "luxon";
  Settings.defaultLocale = "th";

  export let dateDiff;
  export let sale_date,expired_date;




  export function updateDateDiff(start, end) {
    let dateDiff = null;
    if (!start && !end) {
      return null;
    } else if (start && DateTime.fromISO(start) > DateTime.local()) {
      return (dateDiff = "เริ่ม" + DateTime.fromISO(start).toRelative());
    } else {
      if (end && DateTime.local() < DateTime.fromISO(end)) {
        return (dateDiff = "จบ" + DateTime.fromISO(end).toRelative());
      }
    }
  }