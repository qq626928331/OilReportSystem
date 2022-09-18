import request from '@/router/axios';
//根据主旨机构id查询物料
//current 当前页, size 页码, params 查询集合, deptId 部门id
export const getList = (params, deptId) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/list_deptid',
    method: 'get',
    params: {
      ...params,
      deptId
    }
  })
}
//获取物料详情
//id 物料id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除物料
//id 物料id
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加物料
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/submit',
    method: 'post',
    data: row
  })
}
//修改物料
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/submit',
    method: 'post',
    data: row
  })
}
//根据装置ID，物料ID 获取采样点信息
//deptId 装置id,materielid 物料id,sampleName 采样点名称
export const getsampleInfo = (deptId,materielid,sampleName) => {
  return request({
    url: '/api/qcadmin-materiel/materiel/getsampleInfo',
    method: 'get',
    params:{
      deptId,
      materielid,
      sampleName
    }
  })
}
