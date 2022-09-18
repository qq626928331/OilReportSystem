import request from '@/router/axios';

//获取模型镜像列表带分页
//current 当前页 size 页码 params 分页参数
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//获取模型镜像列表
export const getMapList_modelMonitor = () => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/getMapList',
    method: 'get',

  })
}
//获取模型镜像详情
//id 模型镜像id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//批量删除模型镜像
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加模型镜像
//row 模型镜像对象
export const add = (row) => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/submit',
    method: 'post',
    data: row
  })
}
//修改模型镜像
//row 模型镜像对象
export const update = (row) => {
  return request({
    url: '/api/qcadmin-model_monitor/modelmonitor/submit',
    method: 'post',
    data: row
  })
}

