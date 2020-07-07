<template>
  <header>
    <app-container class="header">
      <app-logo />
      <app-button
        v-if="isAuthenticated"
        class="header__logout"
        @click.native="logout"
        >Logout</app-button
      >
    </app-container>
  </header>
</template>

<script>
import Logo from '@/components/blocks/Logo';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  components: {
    'app-logo': Logo,
    'app-container': Container,
    'app-button': Button,
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/auth');
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #a5a5a5;
  padding: 20px 0;
}
.header__logout {
  padding: 0 20px;
}
</style>
