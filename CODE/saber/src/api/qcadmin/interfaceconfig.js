import request from '@/router/axios';

//查询版本信息
export const catchVersionDetail = (versionType) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchVersionDetail',
    method: 'get',
    params: {
      versionType
    }
  })
}

//根据版本id查询数据字段信息
export const catchMatchDetail = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/match/catchMatchDetail',
    method: 'get',
    params: {
      versionValue
    }
  })
}

//修改数据字段信息中元数据字段
export const updateMatchS = (vmatchId, sColumn, sColumnName) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/match/updateMatchS',
    method: 'post',
    params: {
      vmatchId, sColumn, sColumnName
    }
  })
}
//根据版本id输入接口方式
export const catchIfTypeByVersion = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftype/catchIfTypeByVersion',
    method: 'get',
    params: {
      versionValue
    }
  })
}
//根据接口方式查询输入参数
export const catchParamsByInterfaceType = (iftypeId) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/params/catchParamsByInterfaceType',
    method: 'get',
    params: {
      iftypeId
    }
  })
}
//输入接口方式保存
export const saveIftypeByinterfaceType = (interfaceType, versionValue, url, text) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftype/saveIftypeByinterfaceType',
    method: 'post',
    params: {
      interfaceType, versionValue, url, text
    }
  })
}
//数据字段设置保存
export const saveMatch = (matchList) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/match/saveMatch',
    method: 'post',
    data: matchList
  })
}
//输入接口方式新增
export const addIftype = (versionValue, interfaceType, apiUrl, apiTextType, textUrl, textFile) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftype/addIftype',
    method: 'post',
    params: {
      versionValue, interfaceType, apiUrl, apiTextType, textUrl, textFile
    }
  })
}
//添加参数
export const addParams = (newLine) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/params/addParams',
    method: 'post',
    data: newLine
  })
}
//参数修改
export const updateParams = (row) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/params/updateParams',
    method: 'post',
    data: row
  })
}
//参数删除
export const deleteParams = (paramsId) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/params/deleteParams',
    method: 'post',
    params: {
      paramsId
    }
  })
}
//查询装置信息
export const catchDevice = () => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchDevice',
    method: 'get'
  })
}
//修改装置信息
export const updateDevice = (row) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/updateDevice',
    method: 'post',
    data: row
  })
}
//导出装置Excel
export const dragExcel = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/export',
    method: 'post',
    responseType: 'blob',
    data: {
      datas
    }
  })
}
//导出采样点Excel
export const dragExcelSample = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/dragExcelSample',
    method: 'post',
    responseType: 'blob',
    data: {
      datas
    }
  })
}
//导出物料Excel
export const dragExcelMateriel = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/dragExcelMateriel',
    method: 'post',
    responseType: 'blob',
    data: {
      datas
    }
  })
}
//导出物性Excel
export const dragExcelMatterpro = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/dragExcelMatterpro',
    method: 'post',
    responseType: 'blob',
    data: {
      dataInType: datas
    }
  })
}
//保存全部装置
export const saveDeviceAll = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/saveDeviceAll',
    method: 'post',
    data: datas
  })
}
//保存全部采样点
export const saveSampleAll = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/saveSampleAll',
    method: 'post',
    data: datas
  })
}
//保存全部物料
export const saveMaterielAll = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/saveMaterielAll',
    method: 'post',
    data: datas
  })
}
//保存全部物性
export const saveMatterproAll = (datas) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/saveMatterproAll',
    method: 'post',
    data: datas
  })
}
//根据装置编码/名称模糊查询
export const selectDevicecodeorname = (devicecodeorname) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectDevicecodeorname',
    method: 'get',
    params: {
      devicecodeorname
    }
  })
}
//根据采样点编码/名称模糊查询
export const selectSamplecodeorname = (samplecodeorname) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectSamplecodeorname',
    method: 'get',
    params: {
      samplecodeorname
    }
  })
}
//根据物料编码/名称模糊查询
export const selectMaterielcodeorname = (materielcodeorname) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectMaterielcodeorname',
    method: 'get',
    params: {
      materielcodeorname
    }
  })
}
//根据物性编码/名称模糊查询
export const selectMatterprocodeorname = (matterprocodeorname) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectMatterprocodeorname',
    method: 'get',
    params: {
      matterprocodeorname
    }
  })
}
//采样点查询
export const catchSample = () => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchSample',
    method: 'get'
  })
}
//物料查询
export const catchMateriel = () => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchMateriel',
    method: 'get'
  })
}
//物性查询
export const catchMatterpro = (pageNum) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchMatterpro',
    method: 'get',
    params: {
      pageNum
    }
  })
}
//查询数据输出目标字段信息
export const catchOutMatch = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/matchout/catchOutMatch',
    method: 'get',
    params: {
      versionValue
    }
  })
}
//根据版本查询输出接口方式
export const selectIftypeOutByVersion = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftypeout/selectIftypeOutByVersion',
    method: 'get',
    params: {
      versionValue
    }
  })
}
//修改输出接口方式
export const updateIftypeOut = (versionValue, url, type) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftypeout/updateIftypeOut',
    method: 'post',
    params: {
      versionValue, url, type
    }
  })
}
//添加输出接口方式
export const addIftypeOut = (versionValue, url, type) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/iftypeout/addIftypeOut',
    method: 'post',
    params: {
      versionValue, url, type
    }
  })
}
//字段设置保存
export const updateSelectionType = (objMap) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/matchout/updateSelectionType',
    method: 'post',
    data: objMap
  })
}
//查询选中数据
export const catchSelectionData = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/matchout/catchSelectionData',
    method: 'get',
    params: {
      versionValue
    }
  })
}
//输出数据全不选
export const deleteAllCancelSelect = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/matchout/deleteAllCancelSelect',
    method: 'post',
    params: {
      versionValue
    }
  })
}
//查询物性记录数
export const selectMatterproCount = () => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectMatterproCount',
    method: 'get'
  })
}
//查询全部物性
export const catchMatterproAll = () => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/catchMatterproAll',
    method: 'get'
  })
}
//根据版本id查询是否是取数版本
export const selectAccessVersion = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectAccessVersion',
    method: 'get',
    params: {
      versionValue
    }
  })
}
//修改当前版本为取数版本
export const updateAccessVersion = (versionValue, type) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/updateAccessVersion',
    method: 'post',
    params: {
      versionValue, type
    }
  })
}
//修改当前版本为非取数版本
export const updateNotAccessVersion = (versionValue) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/updateNotAccessVersion',
    method: 'post',
    params: {
      versionValue
    }
  })
}
//接口配置器输出数据LIMS
export const sendOutData = (data) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/sendOutData',
    method: 'post',
    data: data
  })
}
//是否为取数版本默认选中
export const defaultSelect = (type) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/defaultSelect',
    method: 'get',
    params: {
      type
    }
  })
}

export const selectCodeData = (name, pageNum, interfaceType, type) => {
  return request({
    url: '/api/qcadmin-interfaceconfig/version/selectCodeListByName',
    method: 'get',
    params: {
      name, pageNum, interfaceType, type
    }
  })
}
