import request from '@/router/axios';

//保存 原油调和临时配置_罐物性信息
export const saveOne = (optCtMatterpro) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterpro/saveOne',
    method: 'post',
    data: optCtMatterpro
  })
}

//根据罐数据信息和临时表ID删除物性值
export const deleteByMainIdAndTankCode = (mainId,tankCode) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterpro/deleteByMainIdAndTankCode',
    method: 'get',
    params: {
      mainId,
      tankCode
    }
  })
}

//根据罐数据信息和临时表ID以及原油Id皮俩个插入数据
export const insertByMainIdAndCodeAndOilId = (mainId,tankCode,oilId,materielTypeId,zfName) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterpro/insertByMainIdAndCodeAndOilId',
    method: 'get',
    params: {
      mainId,
      tankCode,
      oilId,
      materielTypeId,
      zfName
    }
  })
}

//根据罐数据信息和临时表ID以及原油Id皮俩个插入数据
export const insertGasMessageByMainId = (mainId,tankCode,wkId,materielTypeId,zfName) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterpro/insertGasMessageByMainId',
    method: 'get',
    params: {
      mainId,
      tankCode,
      wkId,
      materielTypeId,
      zfName
    }
  })
}

