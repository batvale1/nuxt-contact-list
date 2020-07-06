<template>
  <transition name="fade" mode="out-in" appear>
    <button
      :class="[
        'pagination-btn',
        `pagination-btn_size_${size}`,
        `pagination-btn_direction_${direction}`,
        { 'pagination-btn_active': active },
      ]"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </transition>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'm',
    },
    direction: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.pagination-btn {
  display: flex;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  outline: none;
  justify-content: center;
  transition: all 0.3s linear;
  height: 50px;
  line-height: 50px;
  background-color: #fbfbfb;
  border-radius: 4px;
}

.pagination-btn:focus {
  outline: none;
}

.pagination-btn_size_l {
  width: 140px;
}

.pagination-btn_size_m {
  width: 50px;
}

.pagination-btn_direction_right {
  background-image: url('~assets/images/black-arrow-right.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.pagination-btn_direction_left {
  background-image: url('~assets/images/black-arrow-right.svg');
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(180deg);
}

.pagination-btn:hover {
  cursor: pointer;
  background-color: #b9b9b9;
}

.pagination-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.pagination-btn_active {
  background-color: #2c3e50;
  color: #fff;
}

.pagination-btn_active:hover {
  background-color: #2c3e50;
  color: #fff;
}

.pagination-btn:disabled:hover {
  background-color: #fbfbfb;
  cursor: default;
}
</style>
