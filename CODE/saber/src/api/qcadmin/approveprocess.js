import request from '@/router/axios';

export const getList = ( params) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocess/getList',
    method: 'get',
    params: {
      ...params,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocess/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocess/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const submit = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocess/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-approveprocess/approveprocess/submit',
    method: 'post',
    data: row
  })
}

