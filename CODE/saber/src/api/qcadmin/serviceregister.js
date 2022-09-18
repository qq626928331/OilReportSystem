import request from '@/router/axios';
//获取定时任务分页列表
//current 当前页 size 页码 params 分页参数
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//获取定时任务详情
//serviceId 定时任务id
export const getDetail = (serviceId) => {
  console.warn("定时任务 提交开启："+JSON.stringify(serviceId))

  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/detail',
    method: 'get',
    params: {
      serviceId
    }
  })
}
//删除定时任务
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加定时任务
//row 定时任务对象
export const add = (row) => {
  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/submit',
    method: 'post',
    data: row
  })
}
//修改定时任务
//row 定时任务对象
export const update = (row) => {
  console.warn("定时任务 提交修改："+JSON.stringify(row))
  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/submit',
    method: 'post',
    data: row
  })
}
//开启定时任务
//row 定时任务对象
export const taskStart = (row) => {
  console.warn("定时任务 提交开启："+JSON.stringify(row))

  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/taskStart',
    method: 'post',
    data: row
  })
}
//停止定时任务
//row 定时任务对象
export const taskStop = (row) => {
  return request({
    url: '/api/qcadmin-serviceregister/serviceregister/taskStop',
    method: 'post',
    data: row
  })
}

