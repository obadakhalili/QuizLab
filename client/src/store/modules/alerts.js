const state = {
  alerts: []
};

const mutations = {
  UPDATE_ALERT(state, payload) {
    if (payload.constructor !== Array) {
      state.alerts.splice(0, state.alerts.length, payload);
    } else {
      state.alerts = payload;
    }
  },
  DELETE_ALERT(state, index) {
    state.alerts.splice(index, 1);
  }
};

const actions = {
  updateAlerts({ commit }, payload) {
    commit("UPDATE_ALERT", payload);
  },
  deleteAlert({ commit }, index) {
    commit("DELETE_ALERT", index);
  }
};

const getters = {
  alerts: state => state.alerts
};

export default {
  state,
  mutations,
  actions,
  getters
};
