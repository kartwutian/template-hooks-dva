import routes, { RouteType } from '@/router/_routes';
import { Model } from 'dva';

type StringOrNumber = string | number;
interface USER_INFO {
  name?: string;
  [prop: string]: any;
}

interface ModelState {
  routes: RouteType[];
  MENU_SELECTKEYS: StringOrNumber[];
  USER_INFO: USER_INFO;
}
interface ModelType extends Model {
  state: ModelState;
}

const model: ModelType = {
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

export default model;
