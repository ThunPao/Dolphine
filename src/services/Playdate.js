
import { DateTime,Settings } from "luxon";
  Settings.defaultLocale = "th";
  Settings.defaultZone = "Asia/Bangkok";
  export let dateDiff;
  export let sale_date,expired_date;


  export function updateDateDiff(saleDateISO, expireDateISO) {
    const CurDate = DateTime.local().setZone('Asia/Bangkok');
    
    const saleDate = DateTime.fromISO(saleDateISO).minus({ hours: 7 });
    const expireDate = DateTime.fromISO(expireDateISO).minus({ hours: 7 });
    let dateDiff = null;
    
    if (!saleDateISO && !expireDateISO) {
      return null;
    } else if (saleDateISO && saleDate > CurDate) {
      dateDiff = "เริ่ม" + saleDate.toRelative();
    } else {
      if (expireDateISO && CurDate < expireDate) {
        dateDiff = "จบ" + expireDate.toRelative();
      }
    }
    
    return dateDiff;
  }
