import request from '@/router/axios';

export const getDetailList = (params) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/getDetailList',
    method: 'get',
    params: {
      ...params,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const removedetail = (ids) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const submitdetail = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/submit',
    method: 'post',
    data: row
  })
}

export const getLevelList = () => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocessdetail/getLevelList',
    method: 'get',
  })
}
