import request from '@/router/axios';

//获取详评模板馏分段表列表数据
export const getList = () => {
  return request({
    url: '/api/qcadmin-fraction/fractiontype/getList',
    method: 'get',
  })
}

//新增 详评模板馏分段表数据
export const submitFractiontype = (fractionType) => {
  return request({
    url: '/api/qcadmin-fraction/fractiontype/save',
    method: 'post',
    data: fractionType
  })
}

//获取详评模板馏分段表列表数据
export const getDetaillist = (detailType) => {
  return request({
    url: '/api/qcadmin-fraction/fraction/getDetaillist',
    method: 'get',
    params: {
      detailType,
    }
  })
}

//根据类型插入一条默认的馏分段数据
export const addFraction = (detailType) => {
  return request({
    url: '/api/qcadmin-fraction/fraction/addFraction',
    method: 'get',
    params: {
      detailType,
    }
  })
}

//删除馏分段
export const removeFraction = (ids) => {
  return request({
    url: '/api/qcadmin-fraction/fraction/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//更新馏分段信息
export const updateFraction = (fraction) => {
  return request({
    url: '/api/qcadmin-fraction/fraction/update',
    method: 'post',
    data: fraction
  })
}

//根据类型插入一条默认的馏分段数据
export const getDetailMalist = (detailType) => {
  return request({
    url: '/api/qcadmin-fraction/matterpro/getDetailMalist',
    method: 'get',
    params: {
      detailType,
    }
  })
}

//更新馏分段物性信息
export const saveDetailMa = (matterpro) => {
  return request({
    url: '/api/qcadmin-fraction/matterpro/submit',
    method: 'post',
    data: matterpro
  })
}

//删除馏分段
export const removeDetailMa = (ids) => {
  return request({
    url: '/api/qcadmin-fraction/matterpro/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//删除 详评模板馏分段表
export const removeAll = (detailType) => {
  return request({
    url: '/api/qcadmin-fraction/fractiontype/remove',
    method: 'post',
    params: {
      detailType,
    }
  })
}

