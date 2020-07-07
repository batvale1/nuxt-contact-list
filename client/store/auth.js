import axios from 'axios';
import Cookie from 'js-cookie';

export const state = () => ({
  token: null,
  expiresIn: 0,
});

export const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  getToken(state) {
    return state.token;
  },
};

export const mutations = {
  setAuth: (state, accessToken) => {
    state.token = accessToken;
  },
};

export const actions = {
  register: ({ commit }, payload) => {
    return axios
      .post(process.env.API_URL + '/auth/register', {
        email: payload.email,
        password: payload.password,
      })
      .then((response) => {
        commit('setAuth', response.data.access_token);
        Cookie.set('jwt_token_id', response.data.access_token);
        Cookie.set('expiresIn', response.data.exp);
      });
  },
  login: ({ commit }, payload) => {
    return axios
      .post(process.env.API_URL + '/auth/login', {
        email: payload.email,
        password: payload.password,
      })
      .then((response) => {
        commit('setAuth', response.data.access_token);
        Cookie.set('jwt_token_id', response.data.access_token);
        Cookie.set('expiresIn', response.data.exp);
      });
  },
  logout: ({ commit }) => {
    commit('setAuth', null);
    Cookie.remove('jwt_token_id');
    Cookie.remove('expiresIn');
  },
  checkAuth: ({ commit }, req) => {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt_token_id='));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split('=')[1];
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expiresIn='))
        .split('=')[1];
    }
    if (!token || !expirationDate || Date.now() / 1000 > +expirationDate) {
      return;
    }
    return commit('setAuth', token);
  },
};
