export const state = () => ({
  title: '',
  action: '',
  currentItem: {},
});

export const getters = {
  getTitle(state) {
    return state.title;
  },
  getAction(state) {
    return state.action;
  },
  getCurrentItem(state) {
    return state.currentItem;
  },
};

export const mutations = {
  setTitle(state, { title }) {
    state.title = title;
  },
  setAction(state, { action }) {
    state.action = action;
  },
  setCurrentItem(state, { item }) {
    state.currentItem = item;
  },
  resetCurrentItem(state) {
    state.currentItem = {};
  },
};

export const actions = {
  setTitle: ({ commit }, payload) => {
    return commit('setTitle', payload);
  },
  setAction: ({ commit }, payload) => {
    return commit('setAction', payload);
  },
  setCurrentItem: ({ commit }, payload) => {
    return commit('setCurrentItem', payload);
  },
  resetCurrentItem: ({ commit }) => {
    return commit('resetCurrentItem');
  },
};
