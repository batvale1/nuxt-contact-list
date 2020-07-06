<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  max-width: calc(100% - 400px);
  margin-left: auto;
  margin-right: auto;
}
</style>
