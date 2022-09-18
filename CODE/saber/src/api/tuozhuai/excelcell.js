import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/list',
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
    url: '/api/qcadmin-excel_config_cell/excelcell/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/submit',
    method: 'post',
    data: row
  })
}

export const getExcelDatas = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/getExcelDatas',
    method: 'get',
    params: {
      sheetId
    }
  })
}
export const getExcelDatas_yulan = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/getExcelDatas_yulan',
    method: 'get',
    params: {
      sheetId
    }
  })
}

//物料添加到cell表
export const updataExcelCell = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/updataExcelCell',
    method: 'post',
    data: row
  })
}

//物性添加到cell表
export const updataExcelCellMatterpro = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/updataExcelCellMatterpro',
    method: 'post',
    data: row
  })
}

//查询sheet下cell中所有物性
export const selectWxList = (cellId,type) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/selectWxList',
    method: 'get',
    params: {
      cellId,
      type
    }
  })
}

//勾选的物性入库
export const insertDisMatterpro = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/insertDisMatterpro',
    method: 'post',
    data: row
  })
}

//查询被禁用物性
export const selectDisMatterpro = (sheetId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/selectDisMatterpro',
    method: 'get',
    params: {
      sheetId
    }
  })
}

//删除取消禁用物性
export const deleteDisMatterpro = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/deleteDisMatterpro',
    method: 'post',
    data: row
  })
}

//拖拽后删除原禁用物性
export const deleteDisMatterproByCellId = (cellId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/deleteDisMatterproByCellId',
    method: 'post',
    params: {
      cellId
    }
  })
}

//列删除
export const columnDelete = (columnCellId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/columnDelete',
    method: 'post',
    params: {
      columnCellId
    }
  })
}


//行删除
export const lineDelete = (lineCellId) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/lineDelete',
    method: 'post',
    params: {
      lineCellId
    }
  })
}

//添加数据源
export const submitDataSource = (sheetId,x,y,dataCluChooseValue) => {
  return request({
    url: '/api/qcadmin-excel_config_cell/excelcell/submitDataSource',
    method: 'post',
    params: {
      sheetId,
      x,
      y,
      dataCluChooseValue
    }
  })
}
