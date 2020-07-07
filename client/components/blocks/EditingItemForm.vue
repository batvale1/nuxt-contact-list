<template>
  <div class="editing-item-form">
    <p class="editing-item-form__title">{{ title }}</p>
    <form class="editing-item-form__form">
      <app-input
        type="text"
        v-model="name"
        required
        minlength="2"
        maxlength="30"
        class="editing-item-form__input"
        placeholder="Name..."
      />
      <app-input
        type="text"
        v-model="phone"
        required
        class="editing-item-form__input"
        placeholder="Phone..."
      />
      <app-button
        class="editing-item-form__button"
        theme="dark"
        @click.native.prevent="saveItem"
        >Save</app-button
      >
      <div
        class="editing-item-form__error"
        v-show="!isContentValid"
        ref="error"
      >
        <p class="editing-item-form__error-text">{{ errorText }}</p>
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
      name: '',
      phone: '',
      id: '',
      isContentValid: true,
      errorText: '',
    };
  },
  computed: {
    title() {
      return this.$store.getters['edit-item/getTitle'];
    },
    action() {
      return this.$store.getters['edit-item/getAction'];
    },
  },
  components: {
    'app-input': Input,
    'app-button': Button,
  },
  methods: {
    saveItem() {
      if (this.name && this.phone) {
        this.isContentValid = true;
        this.$store.dispatch('contact-list/saveItem', {
          name: this.name,
          phone: this.phone,
          token: this.$store.getters['auth/getToken'],
          id: this.id,
        });
        this.$store
          .dispatch('edit-item/resetCurrentItem')
          .catch((error) => {
            this.errorText = error.response.data.message;
            this.isContentValid = false;
          })
          .then(() => {
            this.$store.commit('popup/togglePopupVisibility');
          });
      } else {
        this.isContentValid = false;
        this.errorText = 'All fields are required.';
      }
    },
  },
  created() {
    const currentItem = this.$store.getters['edit-item/getCurrentItem'];
    if (
      Object.keys(currentItem).length !== 0 &&
      currentItem.constructor === Object
    ) {
      this.name = currentItem.name;
      this.phone = currentItem.phone;
      this.id = currentItem.id;
    }
  },
};
</script>

<style scoped>
.editing-item-form {
  min-width: 430px;
  min-height: 330px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
}

.editing-item-form__title {
  margin: 0;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 60px;
  text-transform: uppercase;
}

.editing-item-form__form {
  display: flex;
  flex-direction: column;
}

.editing-item-form__input {
  width: 100%;
  height: 47px;
  margin-bottom: 24px;
}

.editing-item-form__button {
  width: 100%;
  margin-top: 33px;
}

.editing-item-form__error {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  margin-top: 30px;
}

.editing-item-form__error-text {
  color: #f00;
  font-size: 14px;
  line-height: 17px;
}
</style>
