<script setup></script>

<template>
  <header>
    <nav class="navbar bg-body-tertiary customStyle">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="./assets/logo.svg" /></a>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
