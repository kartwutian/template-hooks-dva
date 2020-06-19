import globalModel from '@/models/global';
import modelLogin from '../pages/Login/index.model';
import modelTest from '../pages/Test/index.model';

export default [
  // note the use of this which refers to observable instance of the store
  globalModel,
  modelLogin,
  modelTest,
];
