import request from '@/router/axios';

export const dragExcel = (datas, sheetId) => {
  return request({
    url: '/api/blade-desk/dragExcel/dragExcel',
    // method: 'get',
    // responseType: 'blob',
    // params: {//这会把参数塞到请求头
    //   vers,config
    // }
    method: 'post',
    responseType: 'blob',
    data: {
      // params: {//这会把参数塞到请求头
      datas, sheetId
    }
  })
}
//获取待选物料
// [
//   {
//     id: 组织id, label: '组织名',children: [
//       {id: 设备id, label: '设备名', children: [
//           {id: 物料id, label: '物料名'},
//           {id: 物料id, label: '物料名'}]
//       },
//       {id: 设备id, label: '设备名', children: [
//           {id: 物料id, label: '物料名'},
//           {id: 物料id, label: '物料名'}].
//       }]
//   }
// ]

// export const waitMateriels = () => {
//   return request({
//     url: '/api/blade-desk/dragExcel/waitMateriels',
//     method: 'post',
//     data: {}
//   })
// }

export const waitMateriels = () => {
  return request({
    url: '/api/blade-desk/dragExcel/deviceSampleTree',
    method: 'get'
  })
}

//获取待选物性
// [
//   {
//     id: 组织id, label: '组织名',children: [
//       {id: 物性code, label: '物性名', children: [
//           {id: '物性id【不同单位不同id】', label: '单位名'},
//           {id: '物性id【不同单位不同id】', label: '单位名'}]
//       },
//        {id: 物性code, label: '物性名', children: [
//           {id: '物性id【不同单位不同id】', label: '单位名'},
//           {id: '物性id【不同单位不同id】', label: '单位名'}]
//       }]
//   }
// ]
export const waitMaterpros = (wlId) => {
  return request({
    url: '/api/blade-desk/dragExcel/waitMaterpros',
    method: 'post',
    data: {wlId}
  })
}

//数据源列表下拉获取数据源
export const searchModelData = () => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/searchModelData',
    method: 'get'
  })
}

//添加模型
export const submitModel = (id,tableName) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/submitModel',
    method: 'post',
    params:{
      id,
      tableName
    }
  })
}

//添加模型下的sheet页
export const submitReportPro = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/submitReportPro',
    method: 'post',
    data:row
  })
}

//修改模型下的sheet页
export const updateReportPro = (row) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/updateReportPro',
    method: 'post',
    data:row
  })
}

//删除模型
export const deleteModel = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/deleteModel',
    method: 'post',
    params:{
      id
    }
  })
}

//删除sheet
export const deleteSheet = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/deleteSheet',
    method: 'post',
    params:{
      id
    }
  })
}

//修改模型名称
export const editModel = (id,tableName) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/submitModel',
    method: 'post',
    params:{
      id,
      tableName
    }
  })
}

//修改表名称
export const editSheet = (id,reportName) => {
  return request({
    url: '/api/qcadmin-excel_config_excel/exceltable/editSheet',
    method: 'post',
    params:{
      id,
      reportName
    }
  })
}

//查询物性
export const catchMatterpro = () => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/catchMatterpro',
    method: 'get'
  })
}

//根据物性编码查询所有物性单位
export const catchMatterproByUnit = (matterproCode) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectMatterproUnits',
    method: 'get',
    params: {
      matterproCode
    }
  })
}

//根据物性编码查询已选物性单位
export const selectCheckedMatterproUnits = (matterproCode,dataInType) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectCheckedMatterproUnits',
    method: 'get',
    params: {
      matterproCode : matterproCode,
      interfaceType : dataInType
    }
  })
}

//提交物性单位集合到
export const submitCheckedMatterproUnits = (obj)=> {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/submitCheckedMatterproUnits',
    method: 'post',
    data : obj
  })
}
//提交物性单位集合到
// export const submitCheckedMatterproUnits = (unit)=> {
//   return request({
//     url: '/api/qcadmin-interfaceconfig/version/submitCheckedMatterproUnits',
//     method: 'post',
//     data : {
//       // matterproCode : matterproCode,
//       unitList : unit
//       // interfaceType : dataInType=='(LIMS)' ? 'L' : 'M'
//     }
//   })
// }

//根据物性编码查询物性名称
export const catchMatterproNameByMatterproCode = (matterproCode) => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/catchMatterproNameByMatterproCode',
    method: 'get',
    params: {
      matterproCode
    }
  })
}

//计算物性提交
export const submitMatterpro = (excelwxcreaterow) => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/submitMatterpro',
    method: 'post',
    data:excelwxcreaterow
  })
}

//查询计算物性
export const catchCountMatterpro = () => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/catchCountMatterpro',
    method: 'get'
  })
}

//查询创建的计算物性是否重复
export const catchRepeat = (matterproCode1,yusuanfuData,matterproCode2) => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/catchRepeat',
    method: 'get',
    params: {
      matterproCode1,
      yusuanfuData,
      matterproCode2
    }
  })
}

//计算物性检索
export const countMatterproSelect = (text) => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/countMatterproSelect',
    method: 'get',
    params: {
      text
    }
  })
}

//删除混合物性
export const deleteHeWx = (id) => {
  return request({
    url: '/api/qcadmin-excel_config_wx_create/excelwxcreate/deleteHeWx',
    method: 'post',
    params: {
      id
    }
  })
}
