import axios from 'axios';

export const state = () => ({
  token: null,
});

export const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  getToken(state) {
    return state.token;
  }
};

export const mutations = {
  setAuth: (state, accessToken) => {
    console.log('token', accessToken);
    state.token = accessToken;
  }
}

export const actions = {
  register: ({commit}, payload) => {
    return axios
      .post(process.env.API_URL + '/auth/register', {
        email: payload.email,
        password: payload.password
      })
      .then((response) => {
        return commit('setAuth', response.data);
      });
  },
  login: ({commit}, payload) => {
    return axios
      .post(process.env.API_URL + '/auth/login', {
        email: payload.email,
        password: payload.password
      })
      .then((response) => {
        return commit('setAuth', response.data.access_token);
      });
  }
};