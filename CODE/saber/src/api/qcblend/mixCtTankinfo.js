import request from '@/router/axios';

//根据临时表ID查询相关罐信息
export const getMixCtTankinfoByMainId = (mainId,materielTypeId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixcttankinfo/getMixCtTankinfoByMainId',
    method: 'get',
    params: {
      mainId,
      materielTypeId
    }
  })
}

//根据临时表ID和罐code查询相关罐信息
export const getMixCtTankinfoByMainIdAndCode = (mainId,materielTypeId,tankCode,selectType) => {
  return request({
    url: '/api/qcblend-crudeblend/mixcttankinfo/getMixCtTankinfoByMainIdAndCode',
    method: 'get',
    params: {
      mainId,
      materielTypeId,
      tankCode,
      selectType
    }
  })
}

//清空调合计算录入数据
export const delectMixMatterproByBoctmainId = (boctmainId,tankCode,type) => {
  return request({
    url: '/api/qcblend-crudeblend/mixctmatterpro/delectMixMatterproByBoctmainId',
    method: 'get',
    params: {
      boctmainId,
      tankCode,
      type
    }
  })
}



//根据临时表ID和罐code查询相关罐信息
export const getMixCtTankinfoParam = (mainId) => {
  return request({
    url: '/api/qcblend-crudeblend/mixcttankinfo/getMixCtTankinfoParam',
    method: 'get',
    params: {
      mainId,
    }
  })
}


//更新罐信息
export const updateTankInfo = (row) => {
  return request({
    url: '/api/qcblend-crudeblend/mixcttankinfo/update',
    method: 'post',
    data: row
  })
}

//更新罐信息
export const updateByMainId = (mixCtTankinfo) => {
  return request({
    url: '/api/qcblend-crudeblend/mixcttankinfo/updateByMainId',
    method: 'post',
    data: mixCtTankinfo
  })
}



