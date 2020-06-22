import React from 'react';
import { DvaInstance } from 'dva';
import { History } from 'history';

export interface RootPropsType {
  app: DvaInstance;
  history: History;
}
