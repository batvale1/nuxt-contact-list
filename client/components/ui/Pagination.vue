<template>
  <div class="pagination" v-if="listLength">
    <div class="pagination__default-container">
      <ul class="pagination__list">
        <li class="pagination__item">
          <app-pagination-btn
            size="l"
            @click.native="setFirstPageGroup"
            :disabled="firstRecordDisabled"
            >Первая
          </app-pagination-btn>
        </li>
        <li class="pagination__item">
          <app-pagination-btn
            direction="left"
            @click.native="previousPageGroup"
          />
        </li>
      </ul>
      <ul class="pagination__list">
        <li class="pagination__item" v-for="index in pages" :key="index">
          <app-pagination-btn
            :active="index === currentPage"
            @click.native="changeCurrentPage(index)"
          >
            {{ index }}
          </app-pagination-btn>
        </li>
      </ul>
      <ul class="pagination__list">
        <li class="pagination__item">
          <app-pagination-btn direction="right" @click.native="nextPageGroup" />
        </li>
        <li class="pagination__item">
          <app-pagination-btn
            size="l"
            @click.native="setLastPageGroup"
            :disabled="finalRecordDisabled"
            >Последняя
          </app-pagination-btn>
        </li>
      </ul>
    </div>
    <div class="pagination__quantity pagination__quantity_default-view">
      <p class="pagination__quantity-caption">
        {{ currentPage }} из {{ listLength }}
      </p>
    </div>
  </div>
</template>

<script>
import PaginationBtn from '@/components/ui/PaginationBtn.vue';

export default {
  components: {
    'app-pagination-btn': PaginationBtn,
  },
  data() {
    return {
      //текущая страница пагинации
      currentPage: 1,
      //стартовый индекс пагинации
      startIndex: 1,
    };
  },
  methods: {
    //как только клацаем по кнопке меняем переходим на страницу
    //соответствующией позиции пагинизации
    changeCurrentPage(index) {
      if (this.listLength - index >= this.navSideBtnsQuantity) {
        this.startIndex = Math.max(1, index - this.navSideBtnsQuantity);
      } else {
        this.startIndex = Math.max(
          1,
          this.listLength - this.navBtnsQuantity + 1
        );
      }

      this.currentPage = index;
      this.$store.dispatch('shopping-list/changeListPage', {
        page: this.currentPage,
      });
    },
    //получить следующую пачку кнопок навигации
    nextPageGroup() {
      if (this.currentPage < this.listLength) {
        if (
          this.currentPage > this.navSideBtnsQuantity &&
          this.currentPage < this.listLength - this.navSideBtnsQuantity
        ) {
          this.startIndex++;
        }
        this.currentPage++;
        this.$store.dispatch('shopping-list/changeListPage', {
          page: this.currentPage,
        });
      }
    },
    //получить предыдущую пачку кнопок навигации
    previousPageGroup() {
      // this.startIndex = Math.max(this.startIndex - this.navBtnsQuantity, 1);
      if (this.currentPage !== 1) {
        this.currentPage--;

        if (
          this.currentPage > this.navSideBtnsQuantity &&
          this.currentPage < this.listLength - this.navSideBtnsQuantity
        ) {
          this.startIndex--;
        }
        this.$store.dispatch('shopping-list/changeListPage', {
          page: this.currentPage,
        });
      }
    },
    //уйти на первую страницу
    setFirstPageGroup() {
      this.startIndex = 1;
      this.changeCurrentPage(1);
    },
    //уйти на последнюю страницу
    setLastPageGroup() {
      this.startIndex = Math.max(this.listLength - this.navBtnsQuantity + 1, 1);
      this.changeCurrentPage(this.listLength);
    },
  },
  computed: {
    //максимально возможное количество кнопок
    listLength() {
      return Math.ceil(
        this.$store.getters['shopping-list/getListQuantity'] / this.itemsPerPage
      );
    },
    //сколько показывать на странице
    itemsPerPage() {
      return this.$store.getters['shopping-list/getItemsPerPage'];
    },
    //сколько пагинация будет содержать кнопок за раз
    navBtnsQuantity() {
      return this.$store.getters['shopping-list/getPaginationBtnQuantity'];
    },
    //остаток кнопок по бокам
    navSideBtnsQuantity() {
      return this.$store.getters['shopping-list/getPaginationSideBtn'];
    },
    //индекс самой правой видимой кнопки в пагинации
    finalIndex() {
      return Math.min(
        this.startIndex + this.navBtnsQuantity - 1,
        this.listLength
      );
    },
    //массив для отрисовки кнопок в разметке
    pages() {
      const arrToReturn = [];
      for (let i = this.startIndex; i <= this.finalIndex; i++) {
        arrToReturn.push(i);
      }
      return arrToReturn;
    },
    //дизейбл "первая", если мы и так на первой странице пагинации
    firstRecordDisabled() {
      return this.currentPage === 1;
    },
    //дизейбл "последняя", если мы и так на первой странице пагинации
    finalRecordDisabled() {
      return this.currentPage === this.listLength;
    },
  },
  watch: {
    listLength(newValue) {
      if (newValue && this.currentPage > newValue) {
        this.changeCurrentPage(newValue);
      }
    },
  },
  created() {
    this.$nuxt.$on('setFirstPaginationPage', () => {
      this.changeCurrentPage(1);
    });
  },
};
</script>

<style scoped>
.pagination__default-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.pagination__list {
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.pagination__list:last-of-type {
  margin-right: 0;
}

.pagination__item {
  margin-right: 10px;
}

.pagination__item:last-of-type {
  margin-right: 0;
}

.pagination__quantity {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination__quantity-caption {
  font-size: 18px;
  line-height: 22px;
  color: #a2a2a2;
}
</style>
