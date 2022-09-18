import request from '@/router/axios';

//根据用户名,物料类型查询用户配置的物性信息
export const selectOptCtMatterproConfig = (matterielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/selectOptCtMatterproConfig',
    method: 'get',
    params: {
      matterielTypeId
    }
  })
}

//查询所有待选物性的列表
export const waitOptCtMatterproConfig = (matterielTypeId,matterCode) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/waitOptCtMatterproConfig',
    method: 'get',
    params: {
      matterielTypeId,
      matterCode
    }
  })
}

//向临时物性表中添加物性
export const addOptCtMatterConfig = (mainId,tanknum_,mattercodes,matterielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/addOptCtMatterConfig',
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
    url: '/api/qcopt-optblend/optctmatterproconfig/remove',
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
export const updateCtConfigRowOrder = (configId,uorder) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/updateCtConfigRowOrder',
    method: 'post',
    params: {
      configId,uorder
    }
  })
}

//移除所有选中物性
export const removeDefaultMatterprosNew = (materielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/removeDefaultMatterprosNew',
    method: 'post',
    params: {
      materielTypeId,
    }
  })
}