import request from '@/router/axios';
import fileRequest from '@/router/fileaxios'

/**
 * 方案导入
 * @param obj
 * @returns {*}
 */
export const importScheme = (obj) => {
  return fileRequest({
    url: '/api/qccut-scheme/scheme/importScheme',
    method: 'post',
    data: obj
  })
}

/**
 * 方案导出
 * @param schemeId
 * @returns {*}
 */
export const exportScheme = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/exportScheme',
    method: 'get',
    params: {
      schemeId
    }
  })
}

/**
 * 方案复制
 * @param schemeId
 * @returns {*}
 */
export const copyScheme = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/copyScheme',
    methos: 'get',
    params: {
      schemeId
    }
  })
}
/**
 * 方案保存
 * @param obj
 * @returns {*}
 */
export const saveScheme = (obj) => {
  return request({
    url: '/api/qccut-scheme/scheme/saveScheme',
    method: 'post',
    data: obj
  })
}
/**
 * 方案重命名
 * @param schemeId
 * @param schemeName
 * @returns {*}
 */
export const reNameScheme = (schemeId, schemeName) => {
  return request({
    url: '/api/qccut-scheme/scheme/updateSchemeBySchemeId',
    method: 'get',
    params: {
      schemeId,
      schemeName
    }
  })
}
/**
 * 物性列表
 * @param schemeId
 * @returns {*}
 */
export const getSchemeMatterproList = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/getSchemeMatterproList',
    method: 'get',
    params: {
      schemeId
    }
  })
}


//获取左侧方案列表(方案名称模糊查询)
export const getList = (schemeName) => {
  return request({
    url: '/api/qccut-scheme/scheme/selectList',
    method: 'get',
    params: {
      schemeName
    }
  })
}

//判断方案是否有效new
export const checkSidingAndBody = (schemeId) => {
  return request({
    url: 'api/qccut-scheme/scbtDimensionBody/checkSidingAndBody',
    method: 'get',
    params: {
      schemeId
    }
  })
}

//判断方案是否有效
export const checkSiding = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/checkSiding',
    method: 'get',
    params: {
      schemeId
    }
  })
}

//添加一个新方案
export const add = (row) => {
  return request({
    url: '/api/qccut-scheme/scheme/submit',
    method: 'post',
    data: row
  })
}

//获取原油数据
export const searchOil = (cnName, current, size) => {
  return request({
    url: '/api/qccut-scheme/scheme/searchOil',
    method: 'post',
    data: {
      cnName: cnName,
      pageNum: current,
      pageSize: size
    }
  })
}

//侧线方案的添加
export const addSchemeSiding = (schemeSiding) => {
  return request({
    url: '/api/qccut-scheme/scheme/addSchemeSiding',
    method: 'post',
    data: schemeSiding
  })
}

//侧线方案的保存
export const submitSchemeSiding = (schemeSiding) => {
  return request({
    url: '/api/qccut-scheme/scheme/submitSchemeSiding',
    method: 'post',
    data: schemeSiding
  })
}

//侧线方案的删除
export const deleteSidingScheme = (schemesidingIds) => {
  return request({
    url: '/api/qccut-scheme/scheme/deleteSidingScheme',
    method: 'post',
    params: {
      schemesidingIds
    }
  })
}

//侧线方案物性的删除
export const deleteSidingSchemeMatterpro = (sidingmatterproIds) => {
  return request({
    url: '/api/qccut-scheme/scheme/deleteSidingSchemeMatterpro',
    method: 'post',
    params: {
      sidingmatterproIds,
    }
  })
}

//根据方案id查询侧线
export const searchSchemeSidingById = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/searchSchemeSidingById',
    method: 'get',
    params: {
      schemeId
    }
  })
}

//根据方案侧线查询物性
export const selectSidingSchemeMatterpro = (schemesidingId) => {
  return request({
    url: '/api/qccut-scheme/scheme/selectSidingSchemeMatterpro',
    method: 'get',
    params: {
      schemesidingId
    }
  })
}

//方案侧线物性添加
export const submitSidingSchemeMatterpro = (schemeSidingMatterpro, schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/submitSidingSchemeMatterpro',
    method: 'post',
    data: schemeSidingMatterpro
  })
}

//原油切割接口
export const cutResult = (oilids, schemaType, schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/cutoil',
    method: 'get',
    params: {
      oilids,
      schemaType,
      schemeId
    }
  })
}

//根据方案id查询所有物性以及状态
export const getOutputInfo = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/getOutputInfo',
    method: 'get',
    params: {
      schemeId
    }
  })
}

//保存修改的物性状态
export const saveSchemeOutputInfo = (output_map) => {
  return request({
    url: '/api/qccut-scheme/scheme/saveSchemeOutputInfo',
    method: 'post',
    data: output_map
  })
}

//方案ID获取头部物性配置信息
export const selectSinglepointcut = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/selectSinglepointcut',
    method: 'get',
    params: {
      schemeId
    }
  })
}

//保存方案头部物性信息
export const saveSinglepointcut = (singlepointcut) => {
  return request({
    url: '/api/qccut-scheme/scheme/saveSinglepointcut',
    method: 'post',
    data: singlepointcut
  })
}

//删除方案头部物性信息
export const deleteSinglepointcut = (configIds) => {
  return request({
    url: '/api/qccut-scheme/scheme/deleteSinglepointcut',
    method: 'post',
    params: {
      configIds
    }
  })
}

//根据切割id和原油id查看切割结果
export const searchcutresultmainDetail = (cutresultId, oilId) => {
  return request({
    url: '/api/qccut-scheme/scheme/searchcutresultmainDetail',
    method: 'get',
    params: {
      cutresultId,
      oilId
    }
  })
}

//获取报表接口地址URL
export const getBaseurl = () => {
  return request({
    url: './home.json',
    method: 'get',
    params: {}
  })
}

//侧线方案删除
export const handleUpDelete = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/handleUpDelete',
    method: 'post',
    params: {
      schemeId
    }
  })
}

//修改为有效方案
export const updateSchemeIsDeleted0 = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/updateSchemeIsDeleted0',
    method: 'post',
    params: {
      schemeId
    }
  })
}
//修改为无效方案
export const updateSchemeIsDeleted1 = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scheme/updateSchemeIsDeleted1',
    method: 'post',
    params: {
      schemeId
    }
  })
}

//根据原油名称排序
export const sortedByCnName = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedByCnName',
    method: 'get',
    params: {}
  })
}

//根据原油来源排序
export const sortedByDataSource = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedByDataSource',
    method: 'get',
    params: {}
  })
}


//根据原油评价时间排序
export const sortedByOilDate = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedByOilDate',
    method: 'get',
    params: {}
  })
}

//根据原油D20排序
export const sortedByD20 = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedByD20',
    method: 'get',
    params: {}
  })
}

//根据原油SUL排序
export const sortedBySUL = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedBySUL',
    method: 'get',
    params: {}
  })
}

//根据原油TANL排序
export const sortedByTAN = () => {
  return request({
    url: '/api/qccut-scheme/scheme/sortedByTAN',
    method: 'get',
    params: {}
  })
}

//实时更新排序
export const saveSchemeMatterproListOrder = (SchemeSidingMatterpro) => {
  return request({
    url: '/api/qccut-scheme/scheme/saveSchemeMatterproListOrder',
    method: 'post',
    data: SchemeSidingMatterpro
  })
}

//侧线方案的保存
export const submitAndSelectSchemeSiding = (schemeSiding) => {
  return request({
    url: '/api/qccut-scheme/scheme/submitAndSelectSchemeSiding',
    method: 'post',
    data: schemeSiding
  })
}

/**
 * ******************** 以下是布局配置部分的接口 *******************************
 */

/**
 * 布局配置表头信息列表加载
 * @param schemeId
 * @returns {*}
 */
export const selectDimenSionListById = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/selectDimenSionListById',
    method: 'get',
    params: {
      schemeId
    }
  })
}
/**
 * 加载所有表头属性列表
 * @returns {*}
 */
export const selectAttributeList = () => {
  return request({
    url: '/api/qccut-scheme/scTitleAttribute/selectAttributeList',
    method: 'get'
  })
}
/**
 * 添加表头属性
 * @param obj
 * @returns {*}
 */
export const saveDimenSionJBen = (obj) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/saveDimenSionJBen',
    method: 'post',
    data: obj
  })
}

/**
 * 添加分隔符
 * @param id
 * @param schemeId
 * @returns {*}
 */
export const saveSeparator = (id, schemeId) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/saveSeparator',
    method: 'get',
    params: {
      id,
      schemeId
    }
  })
}

/**
 * 表头排序
 * @param obj
 * @returns {*}
 */
export const updateDimenSionListSort = (obj) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/updateDimenSionListSort',
    method: 'post',
    data: obj
  })
}

/**
 * 删除表头
 * @param id
 * @returns {*}
 */
export const deleteDimenSionById = (id) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/deleteDimenSionById',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 物性信息下拉列表
 */
export const selectwxCode = () => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/selectwxCode',
    method: 'get'
  })
}
/**
 * 物性馏分段下拉列表
 * @returns {*}
 */
export const selectDimensionSiding = () => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/selectDimensionSiding',
    method: 'get'
  })
}
/**
 * 根据物性编码查询物性单位
 * @returns {*}
 */
export const selectwxUnit = (wxCode) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/selectwxUnit',
    method: 'get',
    params: {
      wxCode
    }
  })
}
/**
 * 保存添加布局中的物性信息
 * @returns {*}
 */
export const saveDimenSionWx = (obj) => {
  return request({
    url: '/api/qccut-scheme/scTitleDimension/saveDimenSionWx',
    method: 'post',
    data: obj
  })
}

/**
 * 内容表内容生成
 * @param schemeId
 * @returns {*}
 */
export const saveBodyDimenSionBySchemeId = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/saveBodyDimenSionBySchemeId',
    method: 'get',
    params: {
      schemeId
    }
  })
}

/**
 * 内容树形结构加载
 * @param outPutType
 * @param schemeId
 * @returns {*}
 */
export const selectBodyDimeSionList = (outPutType, schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/selectBodyDimeSionList',
    method: 'get',
    params: {
      outPutType,
      schemeId
    }
  })
}
/**
 * 获取当前方案的输出类型
 * @param schemeId
 * @returns {*}
 */
export const selectOutPutList = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/selectOutPutList',
    method: 'get',
    params: {
      schemeId
    }
  })
}
/**
 * 内容布局排序
 * @param obj
 * @returns {*}
 */
export const updateBodyDimenSionSort = (obj) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/updateBodyDimenSionSort',
    method: 'post',
    data: obj
  })
}
/**
 * 内容布局添加分隔符
 * @param id
 * @param schemeId
 * @returns {*}
 */
export const saveBodySeparator = (id, schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/saveBodySeparator',
    method: 'get',
    params: {
      id,
      schemeId
    }
  })
}
/**
 * 内容布局删除
 * @param id
 * @returns {*}
 */
export const deleteDimeSionById = (id) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/deleteDimeSionById',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 输出布局预览
 * @param schemeId
 * @returns {*}
 */
export const selectOutPutListBySchemeId = (schemeId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/selectOutPutListBySchemeId',
    method: 'get',
    params: {
      schemeId
    }
  })
}

/**
 * 获取html文件
 * @param schemeId
 * @returns {*}
 */
export const pageOutPutHtml = (schemeCutId) => {
  return request({
    url: '/api/qccut-scheme/scbtDimensionBody/pageOutPutHtml',
    method: 'get',
    params: {
      schemeCutId
    }
  })
}
