import request from '@/router/axios';

//根据用户名和调和分组查询临时表主数据 原油调和临时配置主表
export const saveOrRemove = (materieltypeId,flag,resultMainId,oilId,zfName) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/saveOrRemove',
    method: 'get',
    params: {
      materieltypeId,
      flag,
      resultMainId,
      oilId,
      zfName
    }
  })
}

//原油计算右侧列表数据加载
export const getRightData = (resultMainId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/getRightData',
    method: 'get',
    params: {
      resultMainId
    }
  })
}

//根据用户查询所有的历史数据
export const selectHistoryResultData = (matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/selectHistoryResultData',
    method: 'get',
    params: {
      matterielTypeId
    }
  })
}

//删除历史记录以及关联数据
export const removeResultHistoryData = (rmainId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/removeResultHistoryData',
    method: 'post',
    params: {
      rmainId
    }
  })
}

//删除历史记录以及关联数据
export const submitHistory = (resultMainId,materieltypeId,tanks_num,createdUser) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/submitHistory',
    method: 'get',
    params: {
      resultMainId,
      materieltypeId,
      tanks_num,
      createdUser
    }
  })
}

//调合结果数据查询
export const selectResultData = (rmainId,tanks_num,materieltypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixresultmain/selectResultData',
    method: 'get',
    params: {
      rmainId,
      tanks_num,
      materieltypeId
    }
  })
}
