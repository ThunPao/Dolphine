const twvoucher = require('@fortune-inc/tw-voucher');

function termm(){
    const vurl = document.getElementById("voucherurl").value;
    twvoucher('0844371268', vurl).then(redeemed => {
        console.log(`redeem ซอง ${redeemed.code} ของ ${redeemed.owner_full_name} จำนวน ${redeemed.amount} บาทแล้ว`) 
    }).catch(err => {
        console.error('invaild voucher code')
    })

}

termm();