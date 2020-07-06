export const state = () => ({
  isPopupShown: false,
  isContentValid: true,
  errorText: '',
});

export const getters = {
  getPopupVisibility(state) {
    return state.isPopupShown;
  },
};

export const mutations = {
  togglePopupVisibility(state) {
    state.isPopupShown = !state.isPopupShown;
  },
};
