<template>
  <input
    class="input"
    type="text"
    required
    placeholder="Разобраться в замыканиях"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {};
</script>

<style scoped>
.input {
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 14px;
  line-height: 17px;
  box-sizing: border-box;
  padding: 5px 6px 13px;
}
</style>
