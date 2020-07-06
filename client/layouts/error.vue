<template>
  <div>
    <div class="error">
      <span class="error__status-code">404</span>
      <p class="error__message">
        <span class="error__page-not-found">Страница не найдена.</span>
        <nuxt-link to="/" class="error__redirect"
          >Перейти на главную.</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.error {
  margin: auto;
  padding: 100px 0;
  text-align: center;
  color: #fff;
}

.error__status-code {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 144px;
  line-height: 174px;
}

.error__message {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
}

.error__redirect {
  color: #fff;
}
</style>
