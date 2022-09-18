import request from '@/router/axios';

/**
 * 快评日报
 * @param obj
 */
export const simpleDetailReportView = (obj) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/simpleDetailReportView',
    method: 'post',
    data: obj
  })
}

export const detailReportReport = (date) => {
  return request({
    url: '/api/qcduty-workoilassess/workorder/dailyReport',
    method: 'get',
    params: {
      date:date
    }
  })
}
