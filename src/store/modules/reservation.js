import moment from "moment";
import api from "../../api/reservation";
import deepmerge from "deepmerge";

// initial state
const state = () => ({
  gridKey: {}
});

// getters
const getters = {};

// actions
const actions = {
  async getData(context, { url_year, url_month }) {
    let data1 = await api.getData(url_year, url_month);
    let data2 = await api.getExtenralData(url_year, url_month, "59015");
    let data3 = await api.getExtenralData(url_year, url_month, "24935");
    let data4 = await api.getExtenralData(url_year, url_month, "23091");

    let buckets = deepmerge.all([data1, data2, data3, data4]);
    context.commit("setGridKey", buckets);
  }
};

// mutations
const mutations = {
  setGridKey(state, value) {
    state.gridKey = { ...value };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
