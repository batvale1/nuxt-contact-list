<template>
  <div class="shopping-list">
    <h1 class="shopping-list__heading">Shopping list</h1>
    <div class="shopping-list__actions">
      <app-button class="shopping-list__button" @click.native="addNewItem"
        >Add item</app-button
      >
      <app-sort-by
        :sortOptions="sortOptions"
        @selectOption="applySort"
      ></app-sort-by>
    </div>
    <ul class="shopping-list__list">
      <transition-group name="slide">
        <app-single-item
          class="shopping-list__item"
          v-for="item in list"
          :key="item.id"
          :item="item"
        />
      </transition-group>
    </ul>
    <app-pagination />
  </div>
</template>

<script>
import Button from '@/components/ui/Button';
import SingleItem from '@/components/blocks/SingleItem';
import SortBy from '@/components/ui/SortBy';
import Pagination from '@/components/ui/Pagination';
export default {
  data() {
    return {
      selectedOption: 0,
    };
  },
  components: {
    'app-button': Button,
    'app-single-item': SingleItem,
    'app-sort-by': SortBy,
    'app-pagination': Pagination,
  },
  computed: {
    list() {
      return this.$store.getters['shopping-list/getList'];
    },
    sortOptions() {
      return this.$store.getters['shopping-list/getSortOptions'];
    },
  },
  methods: {
    addNewItem() {
      this.$store.commit('edit-item/setTitle', { title: 'Add item' });
      this.$store.commit('edit-item/setAction', { action: 'Add' });
      this.$store.commit('popup/togglePopupVisibility');
    },
    applySort(e) {
      this.$store.dispatch('shopping-list/sortItems', { id: e.id });
    },
  },
};
</script>

<style scoped>
.shopping-list {
  padding: 30px;
}

.shopping-list__heading {
  font-weight: 900;
  font-size: 60px;
  line-height: 73px;
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
}

.shopping-list__list {
  list-style: none;
  margin: 0 0 30px 0;
  padding: 0;
  position: relative;
}

.shopping-list__item {
  margin-bottom: 10px;
}

.shopping-list__button {
  width: 150px;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 700;
}

.shopping-list__actions {
  display: flex;
  justify-content: space-between;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 0.8s;
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
}

.slide-move {
  transition: transform 0.8s;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
