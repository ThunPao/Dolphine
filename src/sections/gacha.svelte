<script>
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="container mx-auto">
    <div class="join justify-center">
        <div class="w-4/12">
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                    />
                </figure>
                <div class="card-body bg-white text-red-500">
<div class="join rounded-none">
    <div class="w-8/12 bg-green-500">
        wads
    </div>
    <div class="w-6/12 bg-neutral">
        <div class="card-actions justify-end">
            <div class="join join-vertical">
                <span> INSERT COIN HERE </span>
                <button class="btn btn-primary">START</button>
            </div>
        </div>

    </div>
</div>
                </div>
            </div>
        </div>
        <div class="w-6/12">
            <div class="card card-compact bg-base-100 shadow-xl">
                <figure>
                    <img
                        class="shadow-xl shadow-white border-4"
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                    />
                </figure>
                <div class="card-body">
                    <h2 class="card-title justify-center">
                        Shoes! Lorem ipsum dolor sit amet.
                    </h2>
                </div>
            </div>
        </div>
    </div>

    <div
        class="bg-primary p-4 text-white text-center text-2xl font-bold rounded-t-lg"
    >
        <div class="m-4">ได้รับไอเทมดังต่อไปนี้</div>
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-4 p-2">
            {#each items as data}
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                            width="256"
                            height="182"
                        />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title justify-center">
                            Shoes! Lorem ipsum dolor sit amet.
                        </h2>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
