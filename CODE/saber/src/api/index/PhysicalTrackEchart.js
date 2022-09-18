import request from '@/router/axios';

/**
 * 首页查询物性跟踪值
 * @param time
 */
export const selectAllMatterproValue = (time) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectAllMatterproValue',
    method: 'get',
    params: {
      time: time
    }
  })
}

