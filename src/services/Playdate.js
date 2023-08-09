
import { DateTime,Settings } from "luxon";
  Settings.defaultLocale = "th";

  export let dateDiff;
  export let sale_date,expired_date;




// export function updateDateDiff(sale_date,expired_date) {
//     if (sale_date && DateTime.fromISO(sale_date) > DateTime.local()) {
//       dateDiff = "เริ่ม" + DateTime.fromISO(sale_date).toRelative();
//     } else {
//       if (expired_date && DateTime.local() < DateTime.fromISO(expired_date)) {
//         dateDiff = "จบ" + DateTime.fromISO(expired_date).toRelative();
//       }
//     }
//     return dateDiff;
//   }