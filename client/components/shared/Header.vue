<template>
  <header>
    <app-container class="header">
      <app-logo />
    </app-container>
  </header>
</template>

<script>
import Logo from '@/components/blocks/Logo';
import Container from '@/components/shared/Container';
export default {
  components: {
    'app-logo': Logo,
    'app-container': Container,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #a5a5a5;
  padding: 20px 0;
}
</style>
