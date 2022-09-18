import request from '@/router/axios';
//加载全部单位转换

export const getDataList = (current, size, params) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/convertPageList',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


//current 当前页, size 页码, params 查询集合
export const getList = (current, size, params) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//查看详情
//id 单位转换id
export const getDetail = (id) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除单位转换
//ids 拼装id
export const remove = (ids) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加单位转换
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/submit',
    method: 'post',
    data: row
  })
}
//修改单位转换
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/hontye-unit/materprounitconvert/submit',
    method: 'post',
    data: row
  })
}

