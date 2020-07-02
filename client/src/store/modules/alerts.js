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
  }
};

const actions = {
  updateAlerts({ commit }, payload) {
    commit("UPDATE_ALERT", payload);
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
