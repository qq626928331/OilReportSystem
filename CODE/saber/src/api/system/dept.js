import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/dept/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/blade-system/dept/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}


export const remove = (ids) => {
  return request({
    url: '/api/blade-system/dept/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/dept/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/dept/submit',
    method: 'post',
    data: row
  })
}

export const getDept = (id) => {
  return request({
    url: '/api/blade-system/dept/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getDeptTree = (tenantId) => {
  return request({
    url: '/api/blade-system/dept/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}

export const getDeptLazyTree = (parentId) => {
  return request({
    url: '/api/blade-system/dept/lazy-tree',
    method: 'get',
    params: {
      parentId
    }
  })
}


//懒加载装置树
export const getDeptLazyTreeDevice = (parentId) => {
  return request({
    url: '/api/blade-system/dept/lazy-tree-device',
    method: 'get',
    params: {
      parentId
    }
  })
}

//获取装置树
export const getDeptTreeDevice = () => {
  return request({
    url: '/api/blade-system/dept/tree-device',
    method: 'get',
  })
}

export const getDeptLazyTreeDeviceMateriel = (parentId) => {
  return request({
    url: '/api/blade-system/dept/lazy-tree-device-materiel',
    method: 'get',
    params: {
      parentId
    }
  })
}

export const getTreeDeviceMateriel = () => {
  return request({
    url: '/api/blade-system/dept/tree-device-materiel',
    method: 'get'
  })
}

//查询所有等级的物料结果树
export const getAllLevelMateriel = () => {
  return request({
    url: '/api/blade-system/dept/tree-all-device-materiel',
    method: 'get'
  })
}
