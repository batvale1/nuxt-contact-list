<template>
  <div class="sort-by">
    <select
      class="sort-by__selected-item"
      v-model="selectedOption"
      @change="$emit('selectOption', selectedOption)"
      name="slct"
      id="slct"
    >
      <option
        class="sort-by__option"
        v-for="item in sortOptions"
        :value="item"
        :key="item.id"
      >
        {{ item.option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: 0,
    };
  },
  props: {
    sortOptions: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.selectedOption = this.sortOptions.find(
      (option) => option.id === this.selectedOption
    );
  },
};
</script>

<style scoped>
.sort-by__selected-item {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #2c3e50;
  background-image: none;
}

.sort-by {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  line-height: 3;
  background: #2c3e50;
  overflow: hidden;
  border-radius: 0.25em;
}

.sort-by__option {
  font-size: 16px;
}

.sort-by__selected-item {
  flex: 1;
  padding: 0 0.5em;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.sort-by::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #34495e;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
}

.sort-by:hover::after {
  color: #f39c12;
}
</style>
