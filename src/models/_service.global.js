import request from '@/utils/request';

/**
 * 获取补贴类型
 */
export function getSubsidyList() {
  return request('/api/subsidy/getList', {
    method: 'get',
  });
}
