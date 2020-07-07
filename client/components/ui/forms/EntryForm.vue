<template>
  <div class="entry-form">
    <p class="entry-form__title">Please, log in or register</p>
    <form class="entry-form__form">
      <app-input
        type="text"
        v-model="email"
        required
        minlength="2"
        maxlength="30"
        class="entry-form__input"
        placeholder="email..."
      />
      <app-input
        type="password"
        v-model="password"
        required
        class="entry-form__input"
        placeholder="password..."
      />
      <app-button
        class="entry-form__button"
        theme="dark"
        @click.native.prevent="logIn"
        >Log in</app-button
      >
      <app-button
        class="entry-form__button"
        theme="dark"
        @click.native.prevent="register"
        >Register</app-button
      >
      <div class="entry-form__error" v-show="!isContentValid" ref="error">
        <p class="entry-form__error-text">{{ errorText }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
export default {
  data() {
    return {
      email: '',
      password: '',
      isContentValid: true,
      errorText: '',
    };
  },
  components: {
    'app-input': Input,
    'app-button': Button,
  },
  methods: {
    logIn() {
      this.$store
        .dispatch('auth/login', { email: this.email, password: this.password })
        .then(() => this.$router.push('/'))
        .catch((error) => {
          this.errorText = error.response.data.message;
          this.isContentValid = false;
        });
    },
    register() {
      this.$store
        .dispatch('auth/register', {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push('/'))
        .catch((error) => {
          this.errorText = error.response.data.message;
          this.isContentValid = false;
        });
    },
  },
};
</script>

<style scoped>
.entry-form {
  min-width: 430px;
  min-height: 330px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
}

.entry-form__title {
  margin: 0;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 60px;
  text-transform: uppercase;
}

.entry-form__form {
  display: flex;
  flex-direction: column;
}

.entry-form__input {
  width: 100%;
  height: 47px;
  margin-bottom: 24px;
}

.entry-form__button {
  width: 100%;
  margin-top: 33px;
}

.entry-form__error {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  margin-top: 30px;
}

.entry-form__error-text {
  color: #f00;
  font-size: 14px;
  line-height: 17px;
}
</style>
