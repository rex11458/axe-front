import { queryNotices } from "../services/api";
import { queryProducts, queryFunds } from "../services/api";

export default {
  namespace: "global",
  state: {
    products: [],
    funds: []
  },

  effects: {
    *fetchProducts(_, { call, put }) {
      const data = yield call(queryProducts);
      yield put({
        type: "saveProducts",
        payload: data
      });
    },
    *fetchFunds(_, { call, put }) {
      const data = yield call(queryFunds);
      yield put({
        type: "saveFunds",
        payload: data
      });
    }
  },
  reducers: {
    saveProducts(state, { payload }) {
      return {
        ...state,
       products: payload
      };
    },
      saveFunds(state, { payload }) {
    return {
      ...state,
      funds: payload
    };
  },
  },


  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== "undefined") {
          window.ga("send", "pageview", pathname + search);
        }
      });
    }
  }
};
