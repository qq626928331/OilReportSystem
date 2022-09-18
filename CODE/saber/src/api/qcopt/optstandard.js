import request from '@/router/axios';

//根据相关查询条件，查询集合
export const getStandardList = (optStandard) => {
  return request({
    url: '/api/qcopt-optblend/optstandard/list',
    method: 'post',
    data:optStandard
  })
}

//查询详情
export const getDetail = (id) => {
  return request({
    url: '/api/qcopt-optblend/optstandard/detail',
    method: 'get',
    params: {
      id
    }
  })
}

//删除
export const removeStandard = (ids) => {
  return request({
    url: '/api/qcopt-optblend/optstandard/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//添加对象
export const insertStandard = (optStandard) => {
  return request({
    url: '/api/qcopt-optblend/optstandard/insert',
    method: 'post',
    data: optStandard
  })
}

//更新对象
export const updateStandard = (optStandard) => {
  return request({
    url: '/api/qcopt-optblend/optstandard/update',
    method: 'post',
    data: optStandard
  })
}

//复制
export const optstandardCopy = (obj) => {
  return request({
    url:'/api/qcopt-optblend/optstandard/copy',
    method:'post',
    data: obj
  })
}
