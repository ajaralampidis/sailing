<template>
  <div
    class="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-zinc-800/0 text-lg backdrop-blur-sm transition duration-500 dark:bg-zinc-900/0"
  >
    <a class="3xl:ml-10 ml-6 flex items-center" href="/"
      ><div
        class="m-auto flex h-[2rem] w-[16rem] min-w-[16rem] flex-row items-center overflow-hidden"
        style="filter: drop-shadow(rgba(0, 0, 0, 0.3) 2px 2px 4px)"
      >
        <img
          src="~/assets/images/sailingprotocol-logo.svg"
          alt="Sailing Protocol Org.'s Logo"
          class="w-[16rem] min-w-[16rem]"
        />
      </div>
    </a>
    <div
      class="md:top 3xl:mr-[4.5rem] invisible absolute left-1/2 top-20 w-80 -translate-x-1/2 transform text-center opacity-0 transition-opacity duration-300 md:visible md:static md:mr-12 md:w-auto md:transform-none md:items-center md:opacity-100 md:duration-0"
      id="menu"
    >
      <div
        class="w-full rounded-md bg-gray-600/90 p-4 md:bg-transparent md:p-0"
      >
        <ul class="flex flex-col items-center text-base md:flex-row">
          <li>
            <a
              class="block py-2 font-medium text-gray-700 transition hover:text-sky-500 md:p-4 dark:text-gray-200 dark:hover:text-sky-300"
              href="https://twitter.com/sailingprotocol"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              class="block py-2 font-medium text-gray-700 transition hover:text-sky-500 md:p-4 dark:text-gray-200 dark:hover:text-sky-300"
              href="https://docs.sailingprotocol.org"
              target="_blank"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              class="block py-2 font-medium text-gray-700 transition hover:text-sky-500 md:p-4 dark:text-gray-200 dark:hover:text-sky-300"
              href="https://docs.sailingprotocol.org/frequently-asked-questions"
              target="_blank"
            >
              Whitepaper
            </a>
          </li>
          <li>
            <a
              class="block py-2 font-medium text-gray-700 transition hover:text-sky-500 md:mr-4 md:p-4 dark:text-gray-200 dark:hover:text-sky-300"
              href="https://t.me/nicoszerman"
              target="_blank"
            >
              Contact
            </a>
          </li>
          <li class="flex">
            <AppConnectBtn />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
