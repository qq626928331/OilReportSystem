import request from '@/router/axios';
//获取原油数据库集合
//current 当前页, size 页码, params 查询集合
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//查询数据详情
//id 原油数据库id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//原油数据库删除
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//原油数据库添加
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/submit',
    method: 'post',
    data: row
  })
}
//原油数据库修改
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/submit',
    method: 'post',
    data: row
  })
}
//原油标准数据查看
//id 原油数据库id
export const oilBaseDetail = (id) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/oilBaseDetail',
    method: 'post',
    params: {
      id
    }
  })
}
//轻端标准数据查看
//id 原油数据库id
export const oilBaseDetail_qd = (id) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/oilBaseDetail_qd',
    method: 'post',
    params: {
      id
    }
  })
}
