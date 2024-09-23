<template class="bg-zinc-100">
  <div>
    <AppHeader />
    <main class="min-h-[calc(100vh-4rem)] pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
html {
  overflow-y: scroll;
  @apply scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300;
}

@keyframes example {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(20px) scale(1.1);
  }
}

/* :root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  body {
    background: radial-gradient(circle at 50% 160%, #0c4a6e, #18181b 80%)
      no-repeat fixed;
  }
} */

@media (prefers-color-scheme: light) {
  body {
    background: radial-gradient(circle at 50% 160%, #bae6fd, #f0f9ff00 80%)
      no-repeat fixed;
    /* e0f2fe bae6fdee */
  }
}

body {
  /* background: radial-gradient(circle at 50% 170%, #bae6fdbb, #f0f9ff00 80%); */

  &::before,
  &::after {
    position: fixed;
    border-radius: 100%;
    z-index: -1;
    content: '';
    translate: 0 47%;
  }

  &::before {
    animation: example 5s ease-in-out infinite alternate;
    /* mix-blend-mode: hard-light; */
    height: 100vh;
    width: 110vw;
    @apply bg-sky-200 dark:bg-sky-900;
    filter: blur(20px);
    bottom: -49%;
    left: -23%;
  }

  &::after {
    animation: example 3s ease-in-out infinite alternate-reverse;
    /* mix-blend-mode: hard-light; */
    height: 100vh;
    width: 100vw;
    @apply bg-sky-200 dark:bg-sky-900;
    filter: blur(20px);
    bottom: -49%;
    right: -14%;
  }
}

@keyframes glow {
  from {
    box-shadow: 0px 0px 2px #0ea5e9bb;
  }
  to {
    box-shadow: 0px 0px 30px #0ea5e9bb;
  }
}

.glow {
  animation: glow 2s ease-in-out infinite alternate;
}
</style>
