import routes from '@/router/_routes';

export default {
  namespace: 'global',
  state: {
    routes,
    MENU_SELECTKEYS: [], // 菜单选中的key
    USER_INFO: {
      name: 'bhz',
    },
  },
  reducers: {
    updateByKey(state, { payload }) {
      // 只支持根属性级别的变更
      if (!payload) {
        console.log('缺少payload');
        return;
      }
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *save({ payload: todo }, { put, call }) {
      // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
      // yield call(saveTodoToServer, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'load' });
        }
      });
    },
  },
};
