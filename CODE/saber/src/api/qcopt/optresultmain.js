import request from '@/router/axios';
import requestFile from '@/router/fileaxios';

//根据用户名和调和分组查询临时表主数据 原油调和临时配置主表
export const saveOrRemove = (flag,resultMainId) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/saveOrRemove',
    method: 'get',
    params: {
      flag,
      resultMainId
    }
  })
}

//原油计算右侧列表数据加载
export const getRightData = (resultMainId) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/getRightData',
    method: 'get',
    params: {
      resultMainId
    }
  })
}

//根据用户查询所有的历史数据
export const selectHistoryResultData = (matterielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/selectHistoryResultData',
    method: 'get',
    params: {
      matterielTypeId
    }
  })
}

//删除历史记录以及关联数据
export const removeResultHistoryData = (rmainId) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/removeResultHistoryData',
    method: 'post',
    params:{
      rmainId
    }
  })
}

//删除历史记录以及关联数据
export const submitHistory = (resultMainId,materieltypeId,tanks_num) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/submitHistory',
    method: 'get',
    params: {
      resultMainId,
      materieltypeId,
      tanks_num
    }
  })
}

//调合结果数据查询
export const selectResultData = (rmainId,tanks_num,materieltypeId) => {
  return request({
    url: '/api/qcopt-optblend/optresultmain/selectResultData',
    method: 'get',
    params: {
      rmainId,
      tanks_num,
      materieltypeId
    }
  })
}

//导出Excel
export const exportData = (resultname,resultMainId,tankNum,materieltypeId,username,optMethod) => {
  return requestFile({
    url: '/api/qcopt-optblend/optresultmain/exportData',
    method: 'post',
    responseType: 'blob',
    params: {
      resultname,resultMainId,tankNum,materieltypeId,username,optMethod
    }
  })
}


//保存修改物性精度
export const updateCtMatterConfig = (data) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterproconfig/updateCtMatterConfig',
    method: 'post',
    data:data
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


// //更新0罐数据
// export const updatezfInfoTank = (optCtTankinfo) => {
//   return request({
//     url: '/api/qcopt-optblend/optcttankinfo/updatezfInfoTank',
//     method: 'post',
//     data: optCtTankinfo
//   })
// }
