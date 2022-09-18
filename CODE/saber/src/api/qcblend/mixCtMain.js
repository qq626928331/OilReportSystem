import request from '@/router/axios';

//根据用户名和调和分组查询临时表主数据 原油调和临时配置主表
export const getMixCtMainByUser = (tankNum,materieltypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmain/getMixCtMainByUser',
    method: 'get',
    params: {
      tankNum,
      materieltypeId
    }
  })
}

//根据类型删除所有的信息
export const removeAll = (matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmain/removeAll',
    method: 'post',
    params: {
      matterielTypeId
    }
  })
}

//根据传递的临时主表ID进行调和计算
export const blendCompute = (mainId,matterielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmain/blendCompute',
    method: 'get',
    params: {
      mainId,
      matterielTypeId
    }
  })
}

//根据传递的临时主表ID查询详细信息
export const detail = (boctmainId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmain/detail',
    method: 'get',
    params: {
      boctmainId
    }
  })
}
