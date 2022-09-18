import request from '@/router/axios';

//分页加载工单数据列表
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcduty-workorder/workorder/pageInfoList',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

//加载物性信息
export const onLoadSelectmatterpro = (wkId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/onLoadSelectmatterpro',
    method: 'get',
    params: {
      wkId
    }
  })
}

//多选加载物性信息
export const onLoadSelectmatterproByIds = (obj) => {
  return request({
    url: '/api/qcduty-workorder/workorder/onLoadSelectmatterproByIds',
    method: 'post',
    data:obj
  })
}



/**
 * 上传数据 勾选状态
 * @param wkid
 * @param analysisresultId
 * @param matterproCode
 * @param isPitchOn
 * @returns {*}
 */
export const updateUndatematterpro = (obj) => {
  return request({
    url: '/api/qcduty-workorder/workorder/updateUndatematterpro',
    method: 'post',
    data:obj
  })
}

//查询详情
export const getDetail = (id) => {
  return request({
    url: '/api/qcduty-workorder/workorder/detail',
    method: 'get',
    params: {
      id
    }
  })
}

//批量确认提交，批量审批
export const searchStatusByMateriel = (wkIds, flag, contentInfo) => {
  return request({
    url: '/api/qcduty-workorder/workorder/batchApproval',
    method: 'get',
    params: {
      wkIds,
      flag,
      contentInfo,
    }
  })
}

//驳回
export const reject = (wkIds) => {
  return request({
    url: '/api/qcduty-workorder/workorder/reject',
    method: 'get',
    params: {
      wkIds
    }
  })
}

//作废
export const toVoid = (wkIds) => {
  return request({
    url: '/api/qcduty-workorder/workorder/toVoid',
    method: 'get',
    params: {
      wkIds
    }
  })
}

//查询装置
export const searchDevice = () => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchDevice',
    method: 'get'
  })
}

export const searchDeviceByOil = () => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchDeviceByOil',
    method: 'get'
  })
}


//根据装置id查询采样点
export const searchSampleByDevice = (deviceId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchSampleByDevice',
    method: 'get',
    params: {
      deviceId
    }
  })
}
//根据装置id查询物料
export const searchMaterielByDevice = (deviceId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchMaterielByDevice',
    method: 'get',
    params: {
      deviceId
    }
  })
}

export const searchMaterielWithOilByDevice = (deviceId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchMaterielWithOilByDevice',
    method: 'get',
    params: {
      deviceId
    }
  })
}
//根据装置id和采样点id查询物料信息
export const searchMaterielBySampleAndDevice = (deviceId, sampleId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/searchMaterielBySampleAndDevice',
    method: 'get',
    params: {
      deviceId,
      sampleId
    }
  })
}

//根据工单id获取审核详情
export const approvalDetail = (wk_id) => {
  return request({
    url: '/api/qcduty-workorder/workorder/approvalDetail',
    method: 'get',
    params: {
      wk_id
    }
  })
}

//根据物性编码、物性单位获取分析值
export const getAnalysisUnitValue = (wkid, matterprocode, selectedunitId) => {
  return request({
    url: '/api/qcduty-workorder/workorder/changeAnalysisUnit',
    method: 'get',
    params: {
      wkid,
      matterprocode,
      selectedunitId
    }
  })
}

//根据物性编码，物性单位，分析值来更新分析值
export const updateAnalysisDisValue = (wkid, matterprocode, selectedunitId, value_) => {
  return request({
    url: '/api/qcduty-workorder/workorder/updateAnalysisDisValue',
    method: 'get',
    params: {
      wkid,
      matterprocode,
      selectedunitId,
      value_
    }
  })
}

export const auditStatusSelect = () => {
  return request({
    url: '/api/qcduty-workorder/workorder/auditStatusSelect',
    method: 'get'
  })
}
