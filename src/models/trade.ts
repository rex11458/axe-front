import { Steps } from 'antd';
import { queryProducts, queryFunds, submitBuy } from "../services/api";
import { routerRedux } from "dva/router";

export default {
  namespace: "trade",
  state: {
    step: {
      productCode: "",
      productName: "",
      fundName: "",
      fundCode: [],
      amount: 1000
    },
    stepFormSubmitting: false,
    result: {}
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield put({
        type: "changeStepFormSubmitting",
        stepFormSubmitting: true
      });
      const data = yield call(submitBuy, payload);
      yield put({
        type: "changeStepFormSubmitting",
        stepFormSubmitting: false,
         result: data
      });
      yield put(routerRedux.push("/trade/buy/buy-result"));
    }
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return (state = { ...state, step: { ...state.step, ...payload } });
    },
    changeStepFormSubmitting(state, {stepFormSubmitting, result }) {
      return { ...state,stepFormSubmitting,result };
    }
  }
};
