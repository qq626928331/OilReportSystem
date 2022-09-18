import request from '@/router/axios';

//侧线列表(方案类型，物性分类，侧线名称)
export const getList = (schemeType, materproSort, sidingName) => {
  return request({
    url: '/api/qccut-siding/siding/searchList',
    method: 'get',
    params: {
      schemeType,
      materproSort,
      sidingName,
    }
  })
}

//根据ID删除侧线方案
export const remove = (ids) => {
  return request({
    url: '/api/qccut-siding/siding/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

//修改侧线方案
export const update = (row) => {
  return request({
    url: '/api/qccut-siding/siding/submit',
    method: 'post',
    data: row
  })
}

//拖动行排序
export const updateWithOrder = (sidingId,nodeLevel) => {
  return request({
    url: '/api/qccut-siding/siding/updateWithOrder',
    method: 'post',
   params:{
    sidingId,nodeLevel
   }
  })
}

//默认添加接口
export const addRow = (schemeType,materproSort) => {
  return request({
    url: '/api/qccut-siding/siding/addRow',
    method: 'post',
    params: {
      schemeType,
      materproSort
    }
  })
}

//根据侧线ID查询相关物性信息
export const selectMatterproBySiding = (sidingId) => {
  return request({
    url: '/api/qccut-siding/siding/selectMatterproBySiding',
    method: 'get',
    params: {
      sidingId
    }
  })
}

//添加切线的物性
export const addSidingMatterpro = (sidingVO) => {
  return request({
    url: '/api/qccut-siding/siding/addSidingMatterpro',
    method: 'post',
    data: sidingVO
  })
}

//删除切线的物性
export const deleteMa = (sidmatIds,schemaType,matterSort) => {
  return request({
    url: '/api/qccut-siding/siding/delete',
    method: 'post',
    params: {
      sidmatIds,
      schemaType,
      matterSort
    }
  })
}

//添加切线的物性复制一个
export const copySiding  = (sidingVO) => {
  return request({
    url: '/api/qccut-siding/siding/copySiding ',
    method: 'post',
    data: sidingVO
  })
}

//根据物性分类获取所有的物性编码
export const selectMatterproBySort = (materproSort) => {
  return request({
    url: '/api/qccut-siding/siding/selectMatterproBySort',
    method: 'get',
    params: {
      materproSort
    }
  })
}

//查询侧线名称是否重复
export const selectBySidCode = (sidingCode,materproSort,schemeType) => {
  return request({
    url: '/api/qccut-siding/siding/selectBySidCode',
    method: 'get',
    params: {
      sidingCode,materproSort,schemeType
    }
  })
}