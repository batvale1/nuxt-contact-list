<template>
  <button :class="['button', `button_theme_${theme}`]" type="submit">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'light',
    },
  },
};
</script>

<style scoped>
.button {
  height: 50px;
  box-sizing: border-box;
  padding: 0;
  background-color: #000;
  color: white;
  font-size: 18px;
  border-radius: 4px;
  border: none;
}

.button:focus {
  outline: none;
}

.button:hover {
  cursor: pointer;
}

.button_theme_light {
  background-color: #2c3e50;
  color: #fff;
}

.button_theme_dark {
  background-color: #000;
  color: #fff;
}
</style>
