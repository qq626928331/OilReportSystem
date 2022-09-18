import request from '@/router/axios';

//更新罐信息
export const update = (row) => {
  console.log(row,'row')
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/update',
    method: 'post',
    data: row
  })
}

//更新罐信息
export const updateByMainId = (optCtTankinfo) => {
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/updateByMainId',
    method: 'post',
    data: optCtTankinfo
  })
}

//根据临时表ID查询相关罐信息
export const getOptCtTankinfoByMainId = (mainId,materielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/getOptCtTankinfoByMainId',
    method: 'get',
    params: {
      mainId,
      materielTypeId
    }
  })
}

//清空调合计算录入数据
export const delectOptMatterproByBoctmainId  = (boctmainId,tankCode,type) => {
  return request({
    url: '/api/qcopt-optblend/optctmatterpro/delectOptMatterproByBoctmainId',
    method: 'get',
    params: {
      boctmainId,
      tankCode,
      type
    }
  })
}

//根据临时表ID和罐code查询相关罐信息
export const getOptCtTankinfoByMainIdAndCode = (mainId,materielTypeId,tankCode) => {
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/getOptCtTankinfoByMainIdAndCode',
    method: 'get',
    params: {
      mainId,
      materielTypeId,
      tankCode
    }
  })
}

//根据临时表ID和罐code查询相关罐信息
export const getOptCtTankinfoParam = (mainId) => {
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/getOptCtTankinfoParam',
    method: 'get',
    params: {
      mainId
    }
  })
}

//更新0罐数据
export const updatezfInfoTank = (optCtTankinfo) => {
  return request({
    url: '/api/qcopt-optblend/optcttankinfo/updatezfInfoTank',
    method: 'post',
    data: optCtTankinfo
  })
}
