import request from '@/router/axios';
//根据组织机构id查询装置
//current 当前页, size 页码, params 查询集合, deptId 部门id
export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/qcadmin-device/device/list_deptid',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId
    }
  })
}
//获取装置详情
//id 装置id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-device/device/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除装置
//ids 装置id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-device/device/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加装置
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-device/device/submit',
    method: 'post',
    data: row
  })
}
//修改装置
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-device/device/submit',
    method: 'post',
    data: row
  })
}

