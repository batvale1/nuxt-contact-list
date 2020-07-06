<template>
  <div class="root">
    <app-header />
    <app-overlay v-if="isPopupShown" @click.native="closePopup" />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/shared/Header';
import Overlay from '@/components/service/Overlay';
export default {
  components: {
    'app-header': Header,
    'app-overlay': Overlay,
  },
  computed: {
    isPopupShown() {
      return this.$store.getters['popup/getPopupVisibility'];
    },
  },
  methods: {
    closePopup() {
      this.$store.dispatch('edit-item/resetCurrentItem');
      this.$store.commit('popup/togglePopupVisibility');
    },
  },
};
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.root {
  background-color: black;
  min-height: 100vh;
  font-family: 'Inter';
  padding-bottom: 194px;
  -webkit-font-smoothing: antialiased;
}
</style>
