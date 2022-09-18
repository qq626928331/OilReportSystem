import request from '@/router/axios';

//加载分页列表
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

//查询详情
export const getDetail = (id) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/detail',
    method: 'get',
    params: {
      id
    }
  })
}

//删除事件
export const remove = (ids) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//添加事件
export const add = (row) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/submit',
    method: 'post',
    data: row
  })
}

//更新事件
export const update = (row) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/submit',
    method: 'post',
    data: row
  })
}

//简评报告
export const  simpleReportExp = (wkId) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/simpleReportExp',
    method: 'post',
    params: {
      wkId,
    }
  })
}
//获取报表接口地址URL
export const  getBaseurl = () => {
  return request({
    url: './home.json',
    method: 'get',
    params: {

    }
  })
}

//报表配置器
export const reportConfigure = (data) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/simpleDetailReportView',
    method: 'post',
    params: {
      data,
    }
  })
}