import { get, post } from "~/utils/api";

export default {
  async GET_AUTHENTICATE({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    post('/session', payload, 'SEM_TOKEN_JSON')
      .then(response => {
        const { result } = response.data;
        commit('setAuth', true);
        commit("setToken", result.token);
        commit('setUser', result.user);
      })
      .catch(err => {
        commit('setError', true);
        commit('setMessage', err?.response?.data?.message);
      });
  },

  async GET_LOGOUT({ commit }) {
    commit('setMessage', '');
    commit('setAuth', false);
    commit('setToken', '');
    commit('setUser', []);
  },

  async GET_MENU({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    await get(`/system/menus/${payload.idProfile}/profile`, 'COM_TOKEN_USUARIO')
      .then(response => {
        const { result } = response.data;
        commit("setMenu", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message);
      })
  },

  async SET_MESSAGE_ERROR_LOGIN({ commit }) {
    commit('setError', true);
    commit('setMessage', 'Usuário desconectado com sucesso');
  },

  SET_CLEAR_MESSAGE({ commit }) {
    commit('setError', false);
    commit('setMessage', '');
  }

}
