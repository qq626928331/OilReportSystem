import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getsheetDetail = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/detail',
    method: 'get',
    params: {
      sheetId
    }
  })
}
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/submit',
    method: 'post',
    data: row
  })
}

//根据sheetId查询表信息提供数据回显
export const catchSheetById = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_sheet/excelsheet/catchSheetById',
    method: 'get',
    params: {
      sheetId
    }
  })
}