import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-sample/sample/list',
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
    url: '/api/qcadmin-sample/sample/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-sample/sample/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/qcadmin-sample/sample/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-sample/sample/submit',
    method: 'post',
    data: row
  })
}

