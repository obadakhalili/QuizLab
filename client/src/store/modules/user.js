const state = {
  user: {}
};

const mutations = {
  UPDATE_USER_INFO(state, info) {
    state.user = info;
  }
};

const actions = {
  updateUserInfo({ commit }, info) {
    commit("UPDATE_USER_INFO", info);
  }
};

const getters = {
  userField: ({ user }) => field => user[field]
};

export default {
  state,
  mutations,
  actions,
  getters
};
