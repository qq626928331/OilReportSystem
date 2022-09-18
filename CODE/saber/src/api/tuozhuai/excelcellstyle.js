import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export const getDetail_sheetId = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/detail_sheetId',
    method: 'get',
    params: {
      sheetId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/submit',
    method: 'post',
    data: row
  })
}
export const submitexcelcellstyle = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cellstyle/excelcellstyle/submit',
    method: 'post',
    data: row
  })
}

