<template>
  <div>
    <app-container>
      <transition name="fade">
        <app-popup>
          <app-entry-form />
        </app-popup>
      </transition>
    </app-container>
  </div>
</template>

<script>
  import Container from '@/components/shared/Container';
  import Popup from '@/components/service/Popup';
  import EntryForm from '@/components/ui/forms/EntryForm';
  export default {
    data() {
      return {
        metas: {
          meta_title: 'Contact-list Entry',
          meta_description: 'login or register',
          meta_keywords: 'login or register',
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
    components: {
      'app-container': Container,
      'app-popup': Popup,
      'app-entry-form': EntryForm,
    }
  };
</script>

<style scoped></style>
