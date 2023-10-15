<script lang="ts">
    import { topupRate } from "@controllers/adminController";
    import { apiurl } from "@services/apiurl";
    import type { TopupRate } from "@models/Topuprate";
    import { getCookie } from "@services/cookiemanager";
    const token = getCookie("blyatnakuy");
    let tableHeaders: (keyof TopupRate)[] = [
        "topup_amount",
        "bonus_percent",
        "toggled",
    ];
    import { onMount } from "svelte";
    onMount(async () => {
        await getTopuprate();
    });
    let searchQuerytr: string = "";
    export let selectedItem: TopupRate[] = [];

    async function getTopuprate() {
        if (token) {
            try {
                const response = await fetch(apiurl + "nakuyrate", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseData = await response.json();
                return topupRate.set(responseData);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function addItem() {
        if (token) {
            const requestData = {
                topup_amount: selectedItem[0].topup_amount,
                bonus_percent: selectedItem[0].bonus_percent,
                toggled: selectedItem[0].toggled,
            };

            try {
                const response = await fetch(apiurl + "nakuyrate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    console.log(requestData);
                    // location.reload();
                    const updatedItem = selectedItem[0];
                    topupRate.update((currentValue: TopupRate[]) => {
                        return currentValue.map((item: TopupRate) => {
                            if (item.id === updatedItem.id) {
                                return updatedItem;
                            }
                            return item;
                        });
                    });
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    async function handleSubmit() {
        if (token) {
            const requestData = {
                topup_amount: selectedItem[0].topup_amount,
                bonus_percent: selectedItem[0].bonus_percent,
                toggled: selectedItem[0].toggled,
            };
            try {
                const response = await fetch(
                    apiurl + "nakuyrate/" + selectedItem[0].id,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(requestData),
                    }
                );
                if (response.ok) {
                    console.log(requestData);
                    // location.reload();
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    async function removeItem() {
        if (token) {
            try {
                const rateId = selectedItem[0].id;
                const response = await fetch(apiurl + `nakuyrate/${rateId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    location.reload();
                } else {
                    console.log(response);
                }

                // ... Your implementation ...
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    let EditMode: boolean = false;
    function showAdd() {
        EditMode = false;
        selectedItem = [{
            id: null,
            topup_amount: null,
            bonus_percent: null,
            toggled: "false"
        }];
          // @ts-ignore
          ediTtopup.showModal();
    }
    function showEdit(item: TopupRate) {
        EditMode = true;
        selectedItem = [item];
        // @ts-ignore
        ediTtopup.showModal();
    }
</script>

<h3 class="font-bold text-4xl mb-2">
    <i class="fa-solid fa-chart-simple" /> Topup Rate
</h3>
<div class="join">
    <input
        type="number"
        placeholder="ค้นหาโค๊ด"
        class="input input-bordered w-full max-w-xs join-item"
        bind:value={searchQuerytr}
    />
    <span
        aria-hidden="true"
        class="btn btn-error join-item rounded-r-full"
        on:click={() => {
            searchQuerytr = "";
        }}>ล้าง</span
    >
</div>
<div class="btn btn-success" on:click={() => {
    showAdd();
}}>เพิ่มรายการ</div>
<div class="grid gap-2 overflow-y-auto">
    {#each $topupRate
        .filter((item) => Number(item.topup_amount) >= Number(searchQuerytr))
        .slice(0, 15) as item}
        <div
            class="stats stats-vertical lg:stats-horizontal lg:w-full bg-base-200 "
        >
            {#each tableHeaders as header}
                <div class="stat">
                    {#if header === "topup_amount"}
                        <div class="stat-title">จำนวนเงิน</div>
                        <div class="stat-value">
                            ${item[header]}
                        </div>
                        <!-- <div class="stat-actions">
                                    <button class="btn btn-sm btn-primary">เปลี่ยน</button>
                                </div> -->
                    {:else if header === "bonus_percent"}
                        <div class="stat-title">โบนัส</div>
                        <div class="stat-value">
                            {item[header]}%
                        </div>
                        <!-- <div class="stat-actions">
                                    <button class="btn btn-sm btn-primary"
                                        >เปลี่ยน</button
                                    >
                                </div> -->
                    {:else if header === "toggled"}
                        <div class="stat-title">สถานะ</div>
                        <div class="stat-value">
                            {#if item[header] === "true"}
                                แสดง
                            {:else}
                                ซ่อน
                            {/if}
                        </div>
                        <!-- <div class="stat-actions">
                                    <button class="btn btn-sm btn-primary"
                                        >เปลี่ยน</button
                                    >
                                </div> -->
                    {/if}
                </div>
            {/each}
            <div class="stat">
                <div class="stat-title">จัดการ</div>
                <div class="stat-actions">
                    <div class="join join-vertical gap-2">
                        <button
                            class="btn btn-warning"
                            on:click={() => {
                                showEdit(item);
                            }}>แก้ไข</button
                        >
                        <button class="btn btn-error">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>

<!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
<dialog id="ediTtopup" class="modal">
    <div class="modal-box">
        <button
            class="btn btn-sm btn-error absolute right-2 top-2"
            on:click={() => {
                removeItem();
            }}>ลบรายการนี้</button
        >

        <h3 class="font-bold text-lg mt-8">{EditMode ? "แก้ไข อัตราการเติมเงิน" : "เพิ่ม อัตราเติมเงิน"}</h3>
        <div class="grid justify-center">
            {#if selectedItem[0]}
                {EditMode ? selectedItem[0].id : ""}
                <div class="form-control w-full max-w-xs">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">จำนวนเงิน</span>
                    </label>
                    <input
                        type="number"
                        placeholder="จำนวนเงินขั้นต่ำ"
                        bind:value={selectedItem[0].topup_amount}
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text">โบนัส เปอร์เซ็นต์</span>
                    </label>
                    <input
                        type="number"
                        placeholder="โบนัส %"
                        bind:value={selectedItem[0].bonus_percent}
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div class="">
                    <p>แสดง</p>
                    <input
                        type="checkbox"
                        checked={selectedItem[0]?.toggled == "true"
                            ? true
                            : false}
                        class="toggle toggle-lg"
                    />
                </div>
            {/if}
        </div>
        <div class="modal-action">
            <form method="dialog">
                <div class="join gap-2">
                    <button
                        class="btn btn-info"
                        on:click={() => {
                            handleSubmit();
                        }}>อัพเดท</button
                    >
                    <button class="btn">ปิดหน้าต่างนี้</button>
                </div>
            </form>
        </div>
    </div>
</dialog>
