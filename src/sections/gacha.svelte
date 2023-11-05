<script lang="ts">
    const Bannerimg = "./images/gacha/banner.png"
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let mileage = 98;

    const state = {
    number: 1,
    animating: false,
  };
  function startAnimation() {
    state.animating = true;
    // const interval = setInterval(() => {
    //   state.number = Math.floor(Math.random() * 10) + 1;
    // }, 200);
    state.number = 0;
    setTimeout(() => {
    //   clearInterval(interval);
      setNumberTo5();
    }, 1000);
    setTimeout(() => {
        mileage = mileage+1;
      ResetGacha();
    }, 5000);
  }

  function setNumberTo5() {
    state.number = 5;
  }
  function ResetGacha() {
    state.animating = false;
  }
</script>

<div class="container mx-auto">
    <div class="flex justify-center">
            <div class="card w-96 shadow-xl p-2 bg-primary">
                <div class="p-2">
                    <img
                    src={Bannerimg}
                    alt="BannerGacha"
                    width="400"
                    height="125"
                    />
                </div>
                <figure>
                    <div class="indicator">
                        <span
                            class="indicator-item indicator-center badge mt-4 p-3 gap-2 text-lg"
                        >
                            <div class="text-info">การันตี</div>
                            <progress
                            class:progress-error={mileage >= 100}
                                class="progress progress-success w-56"
                                value={mileage}
                                max="100"
                            />
                            {mileage}%
                        </span>
                       
                        <img
                            src="https://via.placeholder.com/400x250"
                            alt="Gachacontainer"
                        />
                    </div>
                </figure>
                <div class="grid h-44 rounded-none">
                    <div class="join rounded-none">
                        <div class="w-6/12 self-center text-center">
                            {#if state.animating}
                            <span class="loading loading-spinner text-secondary"></span>
                  {:else}
                    {state.number}
                  {/if}
                        </div>
                        <div class="w-8/12">
                            <div class="grid grid-rows-2 h-full">
                                <div class="text-center self-center">
                                    You have 200 Point
                                    <div class="tabs tabs-boxed">
                                        <a class="tab">Tab 1</a>
                                        <a class="tab tab-active">Tab 2</a>
                                        <a class="tab">Tab 3</a>
                                    </div>
                                </div>
                                <div class="text-center self-center">
                                    <div class="text-lg">INSERT COIN HERE</div>
                                    {#if state.animating}
                            <span class="loading loading-spinner text-info"></span>

                                    {:else}
                                    <button
                                        class="btn btn-secondary rounded-full animate-spin duration-200"
                                        on:click={() => {
                                            startAnimation();
                                        }}>START</button
                                    >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

    <div
        class="bg-primary p-4 text-white text-center text-2xl font-bold rounded-t-lg"
    >
        <div class="m-4">ได้รับไอเทมดังต่อไปนี้</div>
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-4 p-2">
            {#each items as data, index}
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://via.placeholder.com/256x182"
                            alt="Shoes"
                            width="256"
                            height="182"
                        />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title justify-center">
                            {index} เปอร์เซ็นต์
                        </h2>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .number {
        font-size: 48px;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
    }

    .animating {
        transform: scale(1.2);
    }
</style>
