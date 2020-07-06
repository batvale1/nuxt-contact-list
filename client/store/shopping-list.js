import axios from 'axios';

export const state = () => ({
  list: [],
  sortOptions: [
    { option: 'Sort by...', id: 0 },
    { option: 'Price: Low to High', id: 1 },
    { option: 'Price: High to Low', id: 2 },
    { option: 'Date: Newest to Oldest', id: 3 },
    { option: 'Date: Oldest to Newest', id: 4 },
  ],
  singleItem: {},
  currentPage: 1,
  itemsPerPage: 2,
  paginationBtnQuantity: 3,
  paginationSideBtn: 1,
});

export const getters = {
  getList: (state) => {
    return state.list.slice(
      state.itemsPerPage * (state.currentPage - 1),
      (state.currentPage - 1) * state.itemsPerPage + state.itemsPerPage
    );
  },
  getSortOptions: (state) => {
    return state.sortOptions;
  },
  getListQuantity: (state) => {
    return state.list.length;
  },
  getItemsPerPage: (state) => {
    return state.itemsPerPage;
  },
  getPaginationBtnQuantity: (state) => {
    return state.paginationBtnQuantity;
  },
  getPaginationSideBtn: (state) => {
    return state.paginationSideBtn;
  },
  getCurrentSingleItem: (state) => {
    return state.singleItem;
  },
  getCurrentPage: (state) => {
    return state.currentPage;
  },
};

export const mutations = {
  setList: (state, { list }) => {
    console.log(list);
    // state.list = list;
  },
  deleteItem: (state, { id }) => {
    const itemToDelete = state.list.find((item) => item.id === id);
    if (itemToDelete !== -1) {
      state.list.splice(itemToDelete, 1);
    }
  },
  addItem: (state, item) => {
    //сервер должен отдать id, а не тут назначать.
    let newId;
    if (state.list.length) {
      newId =
        Math.max.apply(
          Math,
          state.list.map((item) => item.id)
        ) + 1;
    } else {
      newId = 0;
    }
    item.id = newId;
    state.list.unshift(item);
  },
  changeItem: (state, { payload, foundIndex }) => {
    state.list[foundIndex].name = payload.name;
    state.list[foundIndex].price = payload.price;
    state.list[foundIndex].date = payload.date;
  },
  sortItems: (state, { id }) => {
    switch (id) {
      case 0:
        state.list.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
        break;
      case 1:
        state.list.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        });
        break;
      case 2:
        state.list.sort((a, b) => {
          if (b.price < a.price) return -1;
          if (b.price > a.price) return 1;
          return 0;
        });
        break;
      case 3:
        state.list.sort((a, b) => ('' + b.date).localeCompare(a.date));
        break;
      case 4:
        state.list.sort((a, b) => ('' + a.date).localeCompare(b.date));
    }
  },
  changeListPage: (state, { page }) => {
    state.currentPage = page;
  },
  setSingleItem: (state, { id }) => {
    state.singleItem = state.list.find((item) => item.id === +id);
    if (state.singleItem === undefined) {
      throw "the item doesn't exist";
    }
  },
};

export const actions = {
  getList: ({ commit }, payload) => {
    //имитация получения данных с сервера
    console.log('token', payload.token);
    return axios
      .get(process.env.API_URL + '/664/posts', { headers: { Authorization: 'Bearer ' + payload.token } })
      .then((response) => {
        return commit('setList', { list: response.data });
      });
  },
  deleteItem: async ({ commit }, payload) => {
    //тут бы на сервер отправиться и после 200 удалить из стора
    return commit('deleteItem', payload);
  },
  saveItem: async ({ state, commit }, payload) => {
    //тут бы на сервер отправиться и после 200 зафиксировать изменения
    //РЕМАРКА: не сохраняя айтем на сервере невозможно будет его получить при переходе по ссылке (например при добавлении его в список)
    //, ибо айтем не сохраняется на бэке и получить его оттуда следовательно нельзя,
    //переход же по тем айтемам, которые есть в data.json будет работать, ибо это псевдо-данные с бэка, которые я могу всегда получить.
    const foundIndex = state.list.findIndex((item) => item.id === payload.id);
    if (foundIndex === -1) {
      return commit('addItem', payload);
    } else {
      return commit('changeItem', { payload, foundIndex });
    }
  },
  sortItems: ({ commit }, payload) => {
    return commit('sortItems', payload);
  },
  changeListPage: ({ commit }, { page }) => {
    commit('changeListPage', { page });
  },
  getSingleItem: async ({ commit }, { id }) => {
    return commit('setSingleItem', { id });
  },
};
