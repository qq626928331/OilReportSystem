import request from '@/router/axios';

// 获取全部模型
export const getMapList = () => {
  return request({
    url: '/api/qcadmin-model/model/getMapList',
    method: 'get',
  })
}

//获取模型列表带分页
//current 当前页 size 页码 params 分页参数
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-model/model/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//获取单个模型详细信息
//id 模型id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-model/model/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//查询图元端口最新一条数据
//entityId 图元id
export const selectLastPost = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/selectLastPost',
    method: 'get',
    params: {
      entityId
    }
  })
}
//获取添加图元端口数据的id
//entityId 图元id
export const getNewPortkeyId = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/getNewPortkeyId',
    method: 'get',
    params: {
      entityId
    }
  })
}
// //根据id查询图元信息
// //id 图元id
// export const selectTyById = (id) => {
//   return request({
//     url: '/api/qcadmin-model/model/selectTyById',
//     method: 'get',
//     params: {
//       id
//     }
//   })
// }
//查询图元集合
export const searchTyList = () => {
  return request({
    url: '/api/qcadmin-model/model/searchTyList',
    method: 'get'
  })
}
//删除图元
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-model/model/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//删除图元端口
//keyId 端口id
export const removeport = (keyId) => {
  return request({
    url: '/api/qcadmin-model/model/removeport',
    method: 'post',
    params: {
      keyId,
    }
  })
}
//根据id删除图元信息
//entityId 图元id
export const removeById = (entityId) => {
  console.warn("entityId:" + entityId)
  return request({
    url: '/api/qcadmin-model/model/removeById',
    method: 'post',
    params: {
      entityId,
    }
  })
}
//根据图元id删除图元端口
//entityId 图元id
export const removePortByTyId = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/removePortByTyId',
    method: 'post',
    params: {
      entityId,
    }
  })
}
// 添加模型
//row 模型对象
export const addModel = (row) => {
  return request({
    url: '/api/qcadmin-model/model/addModel',
    method: 'post',
    data: row
  })
}
// 添加模型
//row 模型对象
export const add = (row) => {
  return request({
    url: '/api/qcadmin-model/model/submit',
    method: 'post',
    data: row
  })
}

// 更新模型
//row 模型对象
export const update = (row) => {
  return request({
    url: '/api/qcadmin-model/model/submit',
    method: 'post',
    data: row
  })
}

/**
 * 装置建模发布
 * @param obj
 */
export const publish = (obj) => {
  return request({
    url: '/api/qcadmin-model/model/publishModel',
    method: 'post',
    data: obj
  })
}

/**
 * 撤销发布
 * @param id
 */
export const delectMonitor = (id) => {
  return request({
    url: '/api/qcadmin-model/model/delectMonitor',
    method: 'get',
    params: {
      modelId: id
    }
  })
}

/**
 * 装置模型拖拽排序
 * @param obj
 */
export const sortModel = (obj) => {
  return request({
    url: '/api/qcadmin-model/model/sortModel',
    method: 'post',
    data: obj
  })
}


//查询图元资源
export const searchRes = () => {
  return request({
    url: '/api/qcadmin-model/model/searchRes',
    method: 'get',
  })
}
//查询图元分类
export const searchTyClass = () => {
  return request({
    url: '/api/qcadmin-model/model/searchTyClass',
    method: 'get',
  })
}
//查询图元端口集合
//entityId 图元id
export const searchPortList = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/searchPortList',
    method: 'get',
    params: {
      entityId
    }
  })
}

// 添加空模型
export const addEmptyModel = (modelName) => {
  return request({
    url: '/api/qcadmin-model/model/addEmptyModel',
    method: 'get',
    params: {
      modelName
    }
  })
}

//查询图元名称
//entityName 图元名称
export const searchEntityName = (entityName) => {
  return request({
    url: '/api/qcadmin-model/model/searchEntityName',
    method: 'get',
    params: {
      entityName
    }
  })
}
//查询最新一条图元
export const searchNewEntity = () => {
  return request({
    url: '/api/qcadmin-model/model/searchNewEntity',
    method: 'get'
  })
}

//添加图元分类信息
//addTyClass 图元分类
export const addTyClass = (addTyClass) => {
  return request({
    url: '/api/qcadmin-model/model/addTyClass',
    method: 'post',
    params: {
      addTyClass
    }
  })
}
//添加图元资源信息
//addResName 资源名称
export const submitTyRes = (addResName) => {
  return request({
    url: '/api/qcadmin-model/model/submitTyRes',
    method: 'post',
    params: {
      addResName
    }
  })
}
//图元端口修改
//modelVO 模型对象
export const updateDk = (modelVO) => {
  return request({
    url: '/api/qcadmin-model/model/updateDk',
    method: 'post',
    data: modelVO
  })
}
//根据图元分类id查询图元分类
//eclassId 图元分类id
export const selectClassById = (eclassId) => {
  return request({
    url: '/api/qcadmin-model/model/selectClassById',
    method: 'get',
    params: {
      eclassId
    }
  })
}
//根据图元资源id查询图元资源
//assetId 资源id
export const selectResById = (assetId) => {
  return request({
    url: '/api/qcadmin-model/model/selectResById',
    method: 'get',
    params: {
      assetId
    }
  })
}
//根据资源id查询图元资源
//assetId 资源id
export const selectResUrlById = (assetId) => {
  return request({
    url: '/api/qcadmin-model/model/selectResUrlById',
    method: 'get',
    params: {
      assetId
    }
  })
}
//查询第一条图元
export const selectEntityOne = () => {
  return request({
    url: '/api/qcadmin-model/model/selectEntityOne',
    method: 'get'
  })
}
//根据资源id删除资源
//assetId 资源id
export const deleteHander = (assetId) => {
  return request({
    url: '/api/qcadmin-model/model/deleteHander',
    method: 'post',
    params: {
      assetId
    }
  })
}
//-----------------------------------------
//   waitSearchMaterpro,
//   alreadySearchMaterpro,
//   waitToAlreadyChoose,
//   alreadyTowaitChoose,
//   waitSearchMaterproByCode,
//   alreadySearchMaterproByCode,
//------------------------------------------


//左侧待选物性列表
//mo_id 模型id entity_key 图元id materiel_id 物料id
export const waitSearchMaterpro = (mo_id, entity_key, materiel_id) => {
  return request({
    url: '/api/qcadmin-model/model/waitSearchMaterpro',
    method: 'get',
    params: {
      mo_id, entity_key, materiel_id
    }
  })
}

//右侧已选物性列表
//mo_id 模型id entity_key 图元id materiel_id 物料id
export const alreadySearchMaterpro = (mo_id, entity_key, materiel_id) => {
  return request({
    url: '/api/qcadmin-model/model/alreadySearchMaterpro',
    method: 'get',
    params: {
      mo_id, entity_key, materiel_id,
    }
  })
}

//待选添加到已选物性中
//mo_id 模型id entity_key 图元id materiel_id 物料id materpro_code 物性编码
export const waitToAlreadyChoose = (mo_id, materiel_id, entity_key, matterpro_codes) => {

  return request({
    url: '/api/qcadmin-model/model/waitToAlreadyChoose',
    method: 'get',
    params: {
      mo_id, materiel_id, entity_key, matterpro_codes
    }
  })
}

//已选到待选物性中
//ENTITYWX_IDs 图元id集合
export const alreadyTowaitChoose = (ENTITYWX_IDs) => {

  return request({
    url: '/api/qcadmin-model/model/alreadyTowaitChoose',
    method: 'get',
    params: {
      ENTITYWX_IDs
    }
  })
}

//待选物性查询
//mo_id 模型id entity_key 图元id materiel_id 物料id materpro_code 物性编码
export const waitSearchMaterproByCode = (mo_id, entity_key, materiel_id, materpro_code) => {
  return request({
    url: '/api/qcadmin-model/model/waitSearchMaterproByCode',
    method: 'get',
    params: {
      mo_id, entity_key, materiel_id, materpro_code
    }
  })
}
//已选物性查询
//mo_id 模型id entity_key 图元id materiel_id 物料id materpro_code 物性编码
export const alreadySearchMaterproByCode = (mo_id, entity_key, materiel_id, materpro_code) => {
  return request({
    url: '/api/qcadmin-model/model/alreadySearchMaterproByCode',
    method: 'get',
    params: {
      mo_id, entity_key, materiel_id, materpro_code
    }
  })
}
//计算model更新到monitor
//moId 模型id
export const jisuanModelToMonitor = (moId) => {
  return request({
    url: '/api/qcadmin-model/model/jisuanModelToMonitor',
    method: 'post',
    params: {
      moId
    }
  })
}

//计算model更新到monitor
//moId 模型id type 分类
export const setType = (moId, type) => {
  return request({
    url: '/api/qcadmin-model/model/setType',
    method: 'post',
    params: {
      moId, type
    }
  })
}

//已经配置过的物料及物性的图元，直接切换到选中的物料，自动清除掉已配置的其它物料的物性
//moId 模型id entity_key 图元id rangeCode 物性编码
export const clearRightMatterpros = (moId, entity_key, rangeCode) => {
  return request({
    url: '/api/qcadmin-model/model/clearRightMatterpros',
    method: 'post',
    params: {
      moId, entity_key, rangeCode
    }
  })
}





///////////////////

// 复制模型
//row 模型对象
export const copyModel = (row) => {
  return request({
    url: '/api/qcadmin-model/model/copyModel',
    method: 'post',
    data: row
  })
}

// 添加/编辑/保存模型
//row 模型对象
export const saveModel = (row) => {
  return request({
    url: '/api/qcadmin-model/model/saveModel',
    method: 'post',
    data: row
  })
}

// 图元新增
//row 模型对象
export const addTy = (entityName) => {
  return request({
    url: '/api/qcadmin-model/model/addTy',
    method: 'get',
    params: {
      entityName
    }
  })
}

//添加图元端口信息
//modelVO 模型对象
export const addDk = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/addDk',
    method: 'get',
    params: {
      entityId
    }
  })
}

//删除图元
//modelVO 模型对象
export const removeTyById = (entityId) => {
  return request({
    url: '/api/qcadmin-model/model/removeTyById',
    method: 'get',
    params: {
      entityId
    }
  })
}

//图元修改保存
//modelVO 模型对象
export const updateTy = (row) => {
  return request({
    url: '/api/qcadmin-model/model/updateTy',
    method: 'post',
    data: row
  })
}

//上传图片
//modelVO 模型对象
export const updateAvatar = (row) => {
  return request({
    url: '/api/qcadmin-model/model/updateAvatar',
    method: 'post',
    data: row
  })
}


//根据图元ID进行查询图元信息
//modelVO 模型对象
export const selectTyById = (id) => {
  return request({
    url: '/api/qcadmin-model/model/selectTyById',
    method: 'get',
    params: {
      id
    }
  })
}

//关闭预览
//modelVO 模型对象
export const closeJisuanModelToMonitor = (moId) => {
  return request({
    url: '/api/qcadmin-model/model/closeJisuanModelToMonitor',
    method: 'get',
    params: {
      moId
    }
  })
}
