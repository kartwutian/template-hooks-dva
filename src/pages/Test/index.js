import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'dva';
import {} from 'antd';
import { delay } from 'utils/helper';
import {} from './_service.Test.js';

import styles from './index.less';

function TestPage(props) {
  const { history } = props;
  return (
    <div styleName="page">
      <p>TestPage</p>
    </div>
  );
}

export default connect(({ Test }) => ({ Test }))(
  CSSModules(TestPage, styles, {
    allowMultiple: true,
  }),
);
