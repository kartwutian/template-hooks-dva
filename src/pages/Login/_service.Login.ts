import request from '../../utils/request';
import { stringify } from 'qs';

export function login(params) {
  return request('/api/ajaxLogin ', {
    method: 'post',
    data: params,
  });
}

// 发送短信
export function sendSms(params) {
  return request(`/api/open/sms/${params}`, {
    method: 'GET',
  });
}

// 重置密码
export function resetPwd(params) {
  return request('/api/open/resetPwd', {
    method: 'post',
    data: params,
  });
}

// 重置密码
export function userLogout(params) {
  return request('/api/logout', {
    method: 'post',
    data: params,
  });
}
