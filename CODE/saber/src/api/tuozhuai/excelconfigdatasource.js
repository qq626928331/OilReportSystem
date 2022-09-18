import request from '@/router/axios';
//查询全部数据源
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//查询数据源详情
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除数据源
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//新增数据源
export const add = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/submit',
    method: 'post',
    data: row
  })
}
//数据源修改
export const update = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/submit',
    method: 'post',
    data: row
  })
}

//数据源列表下拉获取数据源
export const searchDataSrc = () => {
  return request({
    url: '/api/qcadmin-excel_config_datasrc/excelconfigdatasource/searchDataSrc',
    method: 'get'
  })
}

