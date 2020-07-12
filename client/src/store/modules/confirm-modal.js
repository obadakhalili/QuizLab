const state = {
  modalInfo: {
    message: "",
    procedure: Function
  }
};

const mutations = {
  UPDATE_MODAL_INFO({ modalInfo }, { message, procedure }) {
    modalInfo.message = message;
    modalInfo.procedure = procedure;
  }
};

const actions = {
  updateModalInfo({ commit }, info) {
    commit("UPDATE_MODAL_INFO", info);
  }
};

const getters = {
  modalInfo: state => info => state.modalInfo[info]
};

export default {
  state,
  mutations,
  actions,
  getters
};
