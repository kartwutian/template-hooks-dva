import storage from 'store';

export default (roles) => {
  const auth = storage.get('authority');
  // 支持字符
  if (typeof roles === 'string') {
    return auth === roles;
  }
  // 支持数组
  if (Array.isArray(roles)) {
    return roles.includes(auth);
  }
  // 支持对象
  return !!roles[auth];
};
