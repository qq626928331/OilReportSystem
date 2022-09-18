import request from '@/router/axios';
//加载馏分类型集合
//current当前页 size分页页码 params分页参数
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//馏分类型查看
//id 馏分类型id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//馏分类型删除
//ids id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//馏分类型添加
//row 行对象
export const add = (row) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/submit',
    method: 'post',
    data: row
  })
}
//馏分类型修改
//row 行对象
export const update = (row) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/submit',
    method: 'post',
    data: row
  })
}

//1、馏分类型数据加载
export const searchDetailType = () => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/searchDetailType',
    method: 'get'
  })
}

//2、根据馏分类型查询馏分段
//detailType 馏分类型
export const searchDetailFractionByType = (detailType) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/searchDetailFractionByType',
    method: 'get',
    params: {
      detailType
    }
  })
}

//3、根据馏分类型查询物性
//detailType 馏分类型
export const searchMatterproByType = (detailType) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/searchMatterproByType',
    method: 'get',
    params: {
      detailType
    }
  })
}

//4、添加分馏段
//detailType 馏分类型
export const addFractionRow = (detailType) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/addFractionRow',
    method: 'post',
    params: {
      detailType
    }
  })
}

//5、修改分流段内容
//row 行对象
export const updateDetailFraction = (row) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/updateDetailFraction',
    method: 'post',
    data: row
  })
}

//6、添加馏分类型
export const addDetailType = () => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/addDetailType',
    method: 'post'
  })
}

//7、添加物性
//detailType 馏分类型
export const addMA = (detailType) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/addMA',
    method: 'post',
    params: {
      detailType
    }
  })
}

//8、物性更新
//row 行对象
export const updateMatterpro = (row) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/updateMatterpro',
    method: 'post',
    data: row
  })
}

//9、删除物性
//ids id集合
export const removeMa = (ids) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/removeMa',
    method: 'post',
    params: {
      ids,
    }
  })
}

//10、修改馏分类型名称
//typeId 详情模板馏分段id detailTypeName馏分类型名称
export const saveTypeName = (typeId,detailTypeName) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/saveTypeName',
    method: 'post',
    params: {
      typeId,
      detailTypeName
    }
  })
}

//11、查询所有物性 提供下拉选择
//matterproCodes 物性编码集合
export const searchAllMatterpro = (matterproCodes) => {
  return request({
    url: '/api/qcadmin-detailfraction/detailfraction/searchAllMatterpro',
    method: 'get',
    params: {
      matterproCodes
    }
  })
}