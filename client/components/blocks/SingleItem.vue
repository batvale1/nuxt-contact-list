<template>
  <li class="single-shopping-item">
    <div class="single-shopping-item__info">
      <p class="single-shopping-item__property">{{ item.name }}</p>
      <p class="single-shopping-item__property">
        price: {{ item.price }}&#36;
      </p>
      <p class="single-shopping-item__property">date: {{ item.date }}</p>
    </div>
    <div class="single-shopping-item__controls">
      <app-action-btn
        :type="'edit'"
        @click.native.stop.prevent="editItem"
      ></app-action-btn>
      <app-action-btn
        :type="'delete'"
        @click.native.stop.prevent="deleteItem"
      ></app-action-btn>
    </div>
  </li>
</template>

<script>
import ActionBtn from '@/components/ui/ActionBtn';
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    'app-action-btn': ActionBtn,
  },
  methods: {
    deleteItem() {
      this.$store.dispatch('shopping-list/deleteItem', { id: this.item.id });
    },
    editItem() {
      this.$store.commit('edit-item/setCurrentItem', { item: this.item });
      this.$store.commit('edit-item/setTitle', { title: 'Change item' });
      this.$store.commit('edit-item/setAction', { action: 'Change' });
      this.$store.commit('popup/togglePopupVisibility');
    },
  },
};
</script>

<style scoped>
/* .task */
.single-shopping-item__link {
  border: 1px solid #6f6f6f;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 43px 45px 44px 45px;
  text-decoration: none;
}

.single-shopping-item__controls {
  width: 126px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.single-shopping-item__property {
  margin: 0;
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  color: #fff;
}
</style>
