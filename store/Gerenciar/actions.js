import { get, post, put } from "~/utils/api";

export default {
  GET_CLIENT: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/client/${payload}/find`, 'COM_TOKEN_USUARIO');

      commit('setClient', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  GET_FARM: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/farm/${payload}/find`, 'COM_TOKEN_USUARIO');

      commit('setFarm', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  LIMPAR_MENSAGEM: ({ commit }) => {
    commit('setMessage', '');
    commit('setError', false);
  }
}
