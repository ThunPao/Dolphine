<script>
  import UserProfiles from "../components/profileinfo.svelte";
  import "../styles/dplogo.scss";
  import FormAuth from "../components/formauth.svelte";
  import FormReg from "../components/formregister.svelte";
  import { gsap } from "gsap";
  import { onMount, tick } from "svelte";
  import Topup from "../components/topup.svelte";
  import Redeem from "../components/redeem.svelte";

  let logoimg = "images/dpbg.webp";

  onMount(async () => {
    await tick(); // Wait for the DOM to be fully updated

    const tl = gsap.timeline({ repeat: -1 });
    tl.to("h1", 30, { backgroundPosition: "-960px 0" });
  });

  onMount(() => {
    const themeToggle = document.getElementById("themeToggle");
    const mainElement = document.querySelector("main");
    const swapOnIcon = document.querySelector(".swap-on");
    const swapOffIcon = document.querySelector(".swap-off");

    // Check if theme preference is stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      mainElement.setAttribute("data-theme", storedTheme);
      themeToggle.checked = storedTheme === "light";

      // Toggle icon based on the stored theme preference
      swapOnIcon.style.display = storedTheme === "light" ? "block" : "none";
      swapOffIcon.style.display = storedTheme === "light" ? "none" : "block";
    }

    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        mainElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light"); // Store theme preference in localStorage
        swapOnIcon.style.display = "block"; // Show 'swap-on' icon
        swapOffIcon.style.display = "none"; // Hide 'swap-off' icon
      } else {
        mainElement.setAttribute("data-theme", "kpz");
        localStorage.setItem("theme", "kpz"); // Store theme preference in localStorage
        swapOnIcon.style.display = "none"; // Hide 'swap-on' icon
        swapOffIcon.style.display = "block"; // Show 'swap-off' icon
      }
    });
  });
</script>

<FormAuth />
<FormReg />
<Topup />
<Redeem />
<!-- from-slate-200 dark:from-slate-800 -->
<div
  class="navbar backdrop-blur-sm backdrop-opacity-50 fixed bg-opacity-50 md:hover:bg-opacity-90 bg-gradient-to-b from-slate-800 from-0% z-[789]"
>
  <div class="flex-1">
    <!-- <a href="/" class="btn btn-ghost normal-case text-3xl text-cyan-200 font-bold">Dolphine</a> -->

    <a href="/" class="hover:scale-110">
      <div class="wrapper">
        <h1
          class="border-s-8 stroke-slate-500 title text-3xl md:text-4xl font-bold txtfont"
          style="background-image: url('{logoimg}')"
        >
          Dolphine
        </h1>
      </div>
    </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal">
      <!-- <li><a>Link</a></li> -->
      <!-- <li class="invisible">
        <details>
          <summary> เมนู</summary>
          <ul class="p-2 bg-base-100 z-auto">
            <li>
              <a
                href="/about"
                class="hover:text-sky-400 hover:font-bold text-lg">About you</a
              >
            </li>
            <li>
              <a href="/test" class="hover:text-sky-400 hover:font-bold text-lg"
                >Lavender Haze</a
              >
            </li>
          </ul>
        </details>
      </li> -->
      <li>
        <label class="swap swap-rotate scale-75">
          <!-- this hidden checkbox controls the state -->
          <input title="คลิกเพื่อสลับโหมดสี" type="checkbox" id="themeToggle" />

          <!-- sun icon -->
          <svg
            class="swap-on fill-current w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            /></svg
          >

          <!-- moon icon -->
          <svg
            class="swap-off fill-current w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            /></svg
          >
        </label>
      </li>
      <li class="hidden sm:block">
        <UserProfiles mobile="" />
      </li>
    </ul>
  </div>
</div>
