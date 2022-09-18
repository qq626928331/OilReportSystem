import request from '@/router/axios';

//分页加载快评报告数据
export const getList = (current, size, params,materielid_) => {
  return request({
    url: '/api/qcduty-workreport/workreport/pageInfoList',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      materielid_
    }
  })
}

//根据ID查询一个详情数据
export const getDetail = (id) => {
  return request({
    url: '/api/qcduty-workreport/workreport/detail',
    method: 'get',
    params: {
      id
    }
  })
}

//根据ID删除
export const remove = (ids) => {
  return request({
    url: '/api/qcduty-workreport/workreport/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//添加记录
export const add = (row) => {
  return request({
    url: '/api/qcduty-workreport/workreport/submit',
    method: 'post',
    data: row
  })
}

//修改记录
export const update = (row) => {
  return request({
    url: '/api/qcduty-workreport/workreport/submit',
    method: 'post',
    data: row
  })
}
//切割详细数据
export const oilBaseDetail = (oilId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/cutResult',
    method: 'post',
    params: {
      oilId
    }
  })
}
