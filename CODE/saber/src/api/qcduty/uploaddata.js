import request from '@/router/axios';

//重新上传审批数据
export const reUploadData = (obj) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/reSendOutData',
    method: 'post',
    data: obj
  })
}

//查询左侧表数据
export const selectLeftData = (obj) => {
  return request({
    url: '/api/qcduty-workorder/workorder/selectUploadWkId',
    method: 'post',
    data: obj
  })
}

//查询物性上传主（右上侧）table数据
export const selectUploadPageInfo = (data) => {
  return request({
    url: '/api/qcduty-workorder/workorder/selectUploadPageInfo',
    method: 'post',
    data: data
  })
}

//查询上传物性
export const selectUploadMatterpro = (wkId, inlogId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/selectUploadMatterpro',
    method: 'get',
    params: {
      wkId,
      inlogId
    }
  })
}
