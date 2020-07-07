<template>
  <div class="popup">
    <div class="popup__content">
      <slot></slot>
      <img
        src="@/assets/images/close.svg"
        alt="Закрыть"
        class="popup__close"
        @click="togglePopup"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    togglePopup() {
      this.$store.dispatch('edit-item/resetCurrentItem');
      this.$store.commit('popup/togglePopupVisibility');
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  overflow: auto;
}

.popup__content {
  display: inline-block;
  padding: 40px;
  vertical-align: bottom;
  background-color: #fff;
}

.popup__close {
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
}
</style>
