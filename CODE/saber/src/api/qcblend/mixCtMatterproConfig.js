import request from '@/router/axios';

//根据用户名,物料类型查询用户配置的物性信息
export const selectMixCtMatterproConfig = (matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/selectMixCtMatterproConfig',
    method: 'get',
    params: {
      matterielTypeId
    }
  })
}

//查询所有待选物性的列表
export const waitsearchMatterConfig = (matterielTypeId,matterCode) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/waitsearchMatterConfig',
    method: 'get',
    params: {
      matterielTypeId,
      matterCode
    }
  })
}

//向临时物性表中添加物性
export const addCtMatterConfig = (mainId,tanknum_,mattercodes,matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/addCtMatterConfig',
    method: 'post',
    params: {
      mainId,
      tanknum_,
      mattercodes,
      matterielTypeId
    }
  })
}

//临时配置表中已配置的物性的删除
export const removeCtMatterConfig = (mainId,tanknum_,ids,matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/remove',
    method: 'post',
    params: {
      mainId,
      tanknum_,
      ids,
      matterielTypeId
    }
  })
}

//已选物性行拖拽
 export const updateConfigRowOrder = (configId,uorder) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/updateConfigRowOrder',
    method: 'post',
    params: {
      configId,uorder
    }
  })
}

//移除所有选中物性
export const removeDefaultMatterpros = (materielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/removeDefaultMatterpros',
    method: 'post',
    params: {
      materielTypeId,
    }
  })
}

//保存修改物性精度
export const updateCtMatterConfig = (data) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/updateCtMatterConfig',
    method: 'post',
    data : data
  })
}

//保存修改物性精度
export const selectMatterproUnitByCode = (matterproCode) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterproconfig/selectMatterproUnitByCode',
    method: 'post',
    params: {
      matterproCode
    }
  })
}
