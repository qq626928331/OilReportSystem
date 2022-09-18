import request from '@/router/axios';

//获取原油数据
export const searchOil = (cnName) => {
  return request({
    url: '/api/qcblend-crudeblend/oildata/selectAllOilData',
    method: 'get',
    params: {
      cnName
    }
  })
}

//查询汽油，柴油，燃料油相关
export const selectGasOilData = (cnName,type) => {
  return request({
    url: '/api/qcblend-crudeblend/oildata/selectGasOilData',
    method: 'get',
    params: {
      cnName,
      type
    }
  })
}

//导出Excel
export const exportData = (resultname,resultMainId,tankNum,materieltypeId,username) => {
  return request({
    url: '/api/qcblend-crudeblend/oildata/exportData',
    method: 'post',
    responseType: 'blob',
    params: {
      resultname,resultMainId,tankNum,materieltypeId,username
    }
  })
}

//根据表头排序查询-原油
export const selectAllOilDataOrderBy = (oilname,cnName,orderby) => {
  return request({
    url: '/api/qcblend-crudeblend/oildata/selectAllOilDataOrderBy',
    method: 'get',
    params: {
      oilname,cnName,orderby
    }
  })
}
//根据表头排序查询-其他油
export const selectGasOilDataOrderBy = (oilname,type,cnName,orderby) => {
  return request({
    url: '/api/qcblend-crudeblend/oildata/selectGasOilDataOrderBy',
    method: 'get',
    params: {
      oilname,type,cnName,orderby
    }
  })
}
