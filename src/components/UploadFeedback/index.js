import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { Modal, Button, Row, Col, message } from 'antd';
import Upload from 'rc-upload';
import { uploadPic } from '@/pages/User/CarSubsidyMng/ValueAddTax/_service.ValueAddTax';
import { getExtName } from '@/utils/helper';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.less';

function Feedback(props) {
  const { visible, confirmLoading, onCancel, onOk } = props;
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  return (
    <div styleName="">
      <Modal
        visible={visible}
        title="上传转账凭证"
        onCancel={() => {
          onCancel();
        }}
        confirmLoading={confirmLoading}
        onOk={() => {
          onOk();
        }}
      >
        <div>
          <Upload
            name="multipartFile"
            action={uploadPic()}
            onStart={() => {
              setUploading(true);
            }}
            onError={(e) => {
              message.error('上传失败');
              setUploading(false);
            }}
            onSuccess={(res) => {
              message.success('上传成功');
              setUploading(false);
              const { data } = res;
              setFileList([...fileList, data].slice(-1));
              console.log(fileList);
            }}
          >
            <Button loading={uploading}>上传凭证</Button>
            <div style={{ marginTop: 10 }}>
              支持扩展名: .jpg .png .pdf .doc ...
            </div>
          </Upload>
          {fileList &&
            !!fileList.length &&
            fileList.map((file, index) => (
              <Row key={file.id} style={{ marginTop: 10 }} gutter={10}>
                <Col flex="auto">
                  <a
                    title={file.showPath}
                    href={file.showPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.fileName + '.' + getExtName(file.showPath)}
                  </a>
                </Col>
                <Col
                  title="删除"
                  onClick={() => {
                    const tempFileList = fileList.filter(
                      (item) => item.id !== file.id,
                    );
                    setFileList(tempFileList);
                  }}
                >
                  <CloseOutlined style={{ color: '#40a9ff' }} />
                </Col>
              </Row>
            ))}
        </div>
      </Modal>
    </div>
  );
}

Feedback.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default observer(CSSModules(Feedback, styles));
