import * as example from '../services/example';

export default {

  namespace: 'example',

  state: {
    text: "",
    result: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const ret = yield call(example.query, payload);
      yield put({
        type: 'save',
        payload: {result: ret}
      });      
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    test(state, action) {
      state.text = "hello world";
      return { ...state, ...action.payload };
    },
  },

};
