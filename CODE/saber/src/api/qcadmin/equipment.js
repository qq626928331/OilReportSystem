import request from '@/router/axios';
//加载全部设备
//current 当前页, size 页码, params 查询集合
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-equipment/equipment/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//获取设备详情
//id 装置id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-equipment/equipment/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除设备
//ids 装置id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-equipment/equipment/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加设备
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-equipment/equipment/submit',
    method: 'post',
    data: row
  })
}
//修改设备
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-equipment/equipment/submit',
    method: 'post',
    data: row
  })
}

