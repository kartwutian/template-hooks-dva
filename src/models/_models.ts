import globalModel from '@/models/global';
import modelLogin from '../pages/Login/index.model';
import modelList from '../pages/List/index.model';

export default [
  // note the use of this which refers to observable instance of the store
  globalModel,
  modelLogin,
  modelList,
];
