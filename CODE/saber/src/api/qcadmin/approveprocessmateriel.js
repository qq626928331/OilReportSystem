import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/submit',
    method: 'post',
    data: row
  })
}

export const getMaterielIdList = (processId) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/getMaterielIdList',
    method: 'get',
    params: {
      processId
    }
  })
}

export const submitMateriel = (materielId,deviceId,processId) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/submitMateriel',
    method: 'post',
    params: {
      materielId,
      deviceId,
      processId
    }
  })
}

export const getAllMaterielId = () => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/getAllMaterielId',
    method: 'get',
  })
}

//获取角色信息
export const getRowList = () => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/getRoleList',
    method: 'get',
  })
}

//获取字典信息
export const getVerifyList = () => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessmateriel/getVerifyList',
    method: 'get',
  })
}

//获取字典信息
export const getOtherMaterielIdList = (processId) => {
  return request({
    url: 'api/qcadmin-approveprocess/approveprocessmateriel/getOtherMaterielIdList?processId=' + processId,
    method: 'get',
  })
}
