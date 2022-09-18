import request from '@/router/axios';
//查询全部审批节点
//params 分页参数
export const getList = (params) => {
  return request({
    url: '/api/qcadmin-approvenode/smcfapprovenode/getList',
    method: 'get',
    params: {
      ...params,
    }
  })
}
//查询审批节点详情
//id 审批节点id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-approvenode/smcfapprovenode/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除审批节点
//ids 审批节点id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-approvenode/smcfapprovenode/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加审批节点
//row 审批节点行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-approvenode/smcfapprovenode/submit',
    method: 'post',
    data: row
  })
}
//审批节点更新
//row 审批节点行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-approvenode/smcfapprovenode/submit',
    method: 'post',
    data: row
  })
}

