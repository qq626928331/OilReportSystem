import request from '@/router/axios';
//获取图元列表带分页
//current 当前页 size 页码 params 分页参数
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//对其他vue提供图元集合的接口
export const getNodes = () => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/list',
    method: 'get'
  })
}

//获取图元详情
//id 图元id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//批量删除图元
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加图元
//row 图元对象
export const add = (row) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/submit',
    method: 'post',
    data: row
  })
}
//修改图元
//row 图元对象
export const update = (row) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/submit',
    method: 'post',
    data: row
  })
}
//文件上传
//fd 文件对象
export const updateAvatar = (fd) => {
  return request({
    url: '/api/qcadmin-model_entity/modelentity/updateAvatar',
    method: 'post',
    data:fd
  })
}
