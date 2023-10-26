<script>
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="container mx-auto">
    <div class="lg:join justify-center">
        <div class="lg:w-4/12">
            <div class="card w-96 bg-base-100 shadow-xl p-4">
                <figure>
                    <div class="indicator">
                        <span
                            class="indicator-item indicator-center badge mt-4 p-3 gap-2 text-lg"
                        >
                            <div class="text-info">การันตี</div>
                            <progress
                                class="progress progress-success w-56"
                                value="80"
                                max="100"
                            />
                            80%
                        </span>
                        <img
                            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                    </div>
                </figure>
                <div class="grid h-44 bg-white rounded-none">
                    <div class="join rounded-none">
                        <div class="w-6/12 self-center text-center">
                            DROP GACHA
                        </div>
                        <div class="w-8/12 bg-neutral">
                            <div class="grid grid-rows-2 h-full">
                                <div class="text-center self-center">
                                    <select class="select w-full max-w-xs">
                                        <option disabled selected
                                            >Pick your favorite Simpson</option
                                        >
                                        <option>Homer</option>
                                        <option>Marge</option>
                                        <option>Bart</option>
                                        <option>Lisa</option>
                                        <option>Maggie</option>
                                    </select>
                                    <div class="tabs tabs-boxed">
                                        <a class="tab">Tab 1</a>
                                        <a class="tab tab-active">Tab 2</a>
                                        <a class="tab">Tab 3</a>
                                    </div>
                                </div>
                                <div class="text-center self-center">
                                    <div class="text-lg ">
                                        INSERT COIN HERE
                                    </div>
                                    <button class="btn btn-primary rounded-full"
                                        >START</button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:w-6/12">
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
