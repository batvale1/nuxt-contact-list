<template>
  <div>
    <app-container>
      <transition name="fade">
        <app-popup v-if="isPopupShown">
          <app-editing-item-form />
        </app-popup>
      </transition>
      <app-contact-list />
    </app-container>
  </div>
</template>

<script>
import Container from '@/components/shared/Container';
import ContactList from '@/components/blocks/ContactList';
import Popup from '@/components/service/Popup';
import EditingItemForm from '@/components/blocks/EditingItemForm';
export default {
  data() {
    return {
      metas: {
        meta_title: 'Contact list',
        meta_description: 'test task',
        meta_keywords: 'test task',
      },
    };
  },
  head() {
    if (this.metas) {
      return {
        title: this.metas.meta_title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.metas.meta_description || '',
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.metas.meta_keywords || '',
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.metas.meta_title || '',
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.metas.meta_description || '',
          },
        ],
      };
    }
  },
  middleware: ['auth'],
  components: {
    'app-container': Container,
    'app-contact-list': ContactList,
    'app-popup': Popup,
    'app-editing-item-form': EditingItemForm,
  },
  computed: {
    isPopupShown() {
      return this.$store.getters['popup/getPopupVisibility'];
    },
  },
  async fetch({ store, route, error }) {
    await store
      .dispatch('contact-list/getList', {
        token: store.getters['auth/getToken'],
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' });
      });
  },
};
</script>

<style scoped></style>
