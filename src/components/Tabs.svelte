<script>
  import { shopitems, shopData } from "../services/ShopController";
  import { imgurl } from "../services/apiurl";
  const defaultimg = imgurl + "default.webp";
  import { updateDateDiff } from "../services/Playdate";

  let tabs = ["ไอเทมใหม่", "ไอเทมยอดฮิต", "อันดับเทพทรู"];
  let activeTabIndex = 0;

  function setShopdata(data) {
    shopData.set({
      id: data.id,
      name: data.name,
      href: !data.href ? defaultimg : imgurl + data.href,
      buycount: data.buycount,
      point: data.point,
      limits: data.limits,
      description: data.description,
      title: data.titles,
      sale_date: data.sale_date,
      expired_date: data.expired_date,
      dateDiff: updateDateDiff(data.sale_date, data.expired_date),
    });
  }

  let items = ["Apple", "Banana", "Orange", "Grapes"];
</script>

<div class="tabs d-flex justify-center">
  {#each tabs as tab, index}
    <p
      class="tab tab-bordered"
      class:tab-active={activeTabIndex == index}
      on:click={() => (activeTabIndex = index)}
      aria-hidden="true"
    >
      {tab}
    </p>
  {/each}
</div>

{#if activeTabIndex == 0}
  <div class="grid gap-1">
    {#if items[0]}
      <div class="join items-center">
        <div class="indicator">
          <span
            class="indicator-item indicator-bottom badge badge-secondary font-extrabold mb-2 h-6"
            >{items[0]}</span
          >
          <div class="avatar px-2 py-2">
            <div
              class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img src={defaultimg} alt="" />
            </div>
          </div>
        </div>
        <div class="grid grid-rows-2 text-start mx-2">
          <span class="text-2xl text-info">ที่หนึ่งด้านการวิ่ง</span>
          <span class="text-md">ด้วยระยะทาง 1000 บล็อค</span>
        </div>
      </div>
    {/if}
    {#each items as data, i}
      <div class="join items-center mx-4">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img alt={data[i]} src={defaultimg} />
          </div>
        </div>
        <div class="grid grid-rows-2 text-start mx-2">
          <span class="font-bold">{data}</span>
          <span class="text-sm">ระยะทาง 500 บล็อค</span>
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if activeTabIndex == 1}
  <table class="table">
    <thead>
      <tr>
        <th />
        <th>ชื่อสินค้า</th>
        <th>จำนวน</th>
      </tr>
    </thead>
    <tbody>
      <!-- row loop -->
      {#if $shopitems !== null}
        {#if $shopitems.length > 0}
          {#each $shopitems.slice(0, 5) as item, index}
            <tr
              onclick="shopinfo.showModal()"
              on:click={setShopdata(item)}
              class="hover:bg-base-100 cursor-zoom-in"
              title="ดูรายละเอียด"
            >
              {#if index === 0}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
              {:else if index === 1}
                <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
              {:else if index === 2}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
              {:else}
                <th />
              {/if}

              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        src={!item.href
                          ? imgurl + "default.webp"
                          : imgurl + item.href}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{item.name}</div>
                  </div>
                </div>
              </td>
              <td>{item.buycount}</td>
            </tr>
          {/each}
        {:else}
          <p>ไม่มีข้อมูล.</p>
        {/if}
      {:else}
        {#each Array(5) as _, i}
          <tr class="animate-pulse">
            {#if i === 0}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
            {:else if i === 1}
              <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
            {:else if i === 2}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
            {:else}
              <th />
            {/if}
            <td>
              <div class="h-4 bg-slate-700 rounded" />
            </td>
            <td>
              <div class="h-3 bg-slate-700 rounded" />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>{/if}

{#if activeTabIndex == 2}
  <table class="table">
    <thead>
      <tr>
        <th />
        <th>ผู้เล่น</th>
        <th>จำนวน</th>
      </tr>
    </thead>
    <tbody>
      <!-- row loop -->
      {#if $shopitems !== null}
        {#if $shopitems.length > 0}
          {#each $shopitems.slice(0, 5) as data, index}
            <tr class="hover:bg-base-100" title={data.name}>
              {#if index === 0}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
              {:else if index === 1}
                <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
              {:else if index === 2}
                <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
              {:else}
                <th />
              {/if}

              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        src="https://daisyui.com/tailwind-css-component-profile-4@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{data.name}</div>
                  </div>
                </div>
              </td>
              <td>{data.buycount}</td>
            </tr>
          {/each}
        {:else}
          <p>ไม่มีข้อมูล.</p>
        {/if}
      {:else}
        {#each Array(5) as _, i}
          <tr class="animate-pulse">
            {#if i === 0}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-400" /></th>
            {:else if i === 1}
              <th><i class="fa-solid fa-xl fa-trophy text-zinc-300" /></th>
            {:else if i === 2}
              <th><i class="fa-solid fa-xl fa-trophy text-amber-600" /></th>
            {:else}
              <th />
            {/if}
            <td>
              <div class="h-4 bg-slate-700 rounded" />
            </td>
            <td>
              <div class="h-3 bg-slate-700 rounded" />
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
{/if}
