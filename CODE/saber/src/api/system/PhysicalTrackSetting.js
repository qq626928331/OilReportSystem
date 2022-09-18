import request from '@/router/axios';

/**
 * 获取tab切换list
 * @param id
 */
export const getTabList = (id) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/matterproTrackingConfig',
    method: 'get',
    params: {
      ...id
    }
  })
}
/**
 * 查询所有物性（待选）
 * @param materiel_id
 */
export const selectAllMaterproByMaterielId = (materiel_id) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectAllMaterproByMaterielId',
    method: 'get',
    params: {
      materiel_id: materiel_id
    }
  })
}

/**
 * 查询当前选中的物性
 * @param id
 */
export const selectAlreadyMatterproById = (id) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectAlreadyMatterproById',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 保存配置
 * @param obj
 */
export const saveUpdateMatterproTrackingConfig = (obj) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/saveUpdateMatterproTrackingConfig',
    method: 'post',
    data: obj
  })
}
/**
 * 发布配置
 */
export const releaseMatterproTrackingConfig = () => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/releaseMatterproTrackingConfig',
    method: 'post'
  })
}
/**
 * 撤销发布
 */
export const cancelMatterproTrackingRelease = () => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/cancelMatterproTrackingRelease',
    method: 'get'
  })
}
/**
 * 查询发布状态
 */
export const selectReleaseStatus = () => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectReleaseStatus',
    method: 'get'
  })
}

/**
 * 配置页echarts预览
 * @param dayNum
 * @param id
 * @returns {*}
 */
export const selectMatterproTrackingValue = (dayNum, id) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectMatterproTrackingValue',
    method: 'get',
    params: {
      dayNum: dayNum,
      id: id
    }
  })
}
