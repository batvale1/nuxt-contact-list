import axios from 'axios';

export const state = () => ({
  list: [],
  sortOptions: [
    { option: 'Sort by...', id: 0 },
    { option: 'Name: Z to A', id: 1 },
    { option: 'Name: A to Z', id: 2 },
  ],
  singleItem: {},
});

export const getters = {
  getList: (state) => {
    return state.list;
  },
  getSortOptions: (state) => {
    return state.sortOptions;
  },
};

export const mutations = {
  setList: (state, { list }) => {
    state.list = list;
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
        state.list.sort((a, b) => ('' + b.name).localeCompare(a.name));
        break;
      case 2:
        state.list.sort((a, b) => ('' + a.name).localeCompare(b.name));
    }
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
    console.log(payload.token);
    return axios
      .get(process.env.API_URL + '/lists', {
        headers: { Authorization: 'Bearer ' + payload.token },
      })
      .then((response) => {
        return commit('setList', { list: response.data });
      });
  },
  deleteItem: async ({ commit }, payload) => {
    return axios
      .delete(process.env.API_URL + '/lists', {
        headers: { Authorization: 'Bearer ' + payload.token, id: payload.id },
      })
      .then((response) => {
        return commit('setList', { list: response.data.list });
      });
  },
  saveItem: async ({ state, commit }, payload) => {
    const foundIndex = state.list.findIndex((item) => item.id === payload.id);
    return axios
      .patch(
        process.env.API_URL + '/lists',
        {
          itemId: payload.id,
          name: payload.name,
          phone: payload.phone,
        },
        {
          headers: { Authorization: 'Bearer ' + payload.token },
        }
      )
      .then((response) => {
        return commit('setList', { list: response.data.list });
      });
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
