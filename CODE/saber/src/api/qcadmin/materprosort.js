import request from '@/router/axios';
//加载物性分类集合
//current 当前页, size 页码, params 查询集合
export const getList = (current, size, params) => {
  return request({
    url: '/api/hontye-materproSort/materprosort/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//查询物性分类详情
//id 物性分类id
export const getDetail = (id) => {
  return request({
    url: '/api/hontye-materproSort/materprosort/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除物性分类
//ids 物性分类id集合
export const remove = (ids) => {
  return request({
    url: '/api/hontye-materproSort/materprosort/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//物性分类添加
//row 行数据
export const add = (row) => {
  return request({
    url: '/api/hontye-materproSort/materprosort/submit',
    method: 'post',
    data: row
  })
}
//物性分类修改
//row 行数据
export const update = (row) => {
  return request({
    url: '/api/hontye-materproSort/materprosort/submit',
    method: 'post',
    data: row
  })
}
//查询物性分类
export const searchMaterproSort = () =>{
  return request({
    url: '/api/hontye-materproSort/materprosort/searchMaterproSort',
    method: 'get'
  })
}

//左侧待选物性列表
//sort 类别
export const waitSearchMaterpro = (sort) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/waitSearchMaterpro',
    method: 'get',
    params: {
      sort,
    }
  })
}

//右侧已选物性列表
//sort 类别
export const alreadySearchMaterpro = (sort) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/alreadySearchMaterpro',
    method: 'get',
    params: {
      sort,
    }
  })
}

//选中待选物性添加到已选物性中
//ids id集合，materproCode 物性编码
export const waitToAlreadyChoose = (ids,materproSort) => {

  return request({
    url: '/api/qcadmin-matterpro/matterpro/waitToAlreadyChoose',
    method: 'get',
    params: {
      ids,
      materproSort
    }
  })
}

//已选到待选物性中
//ids id集合，materproCode 物性编码
export const alreadyTowaitChoose = (ids,materproSort) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/alreadyTowaitChoose',
    method: 'get',
    params: {
      ids,
      materproSort
    }
  })
}

//待选物性查询
//materproCode 物性编码,sort 类别
export const waitSearchMaterproByCode = (materproCode,sort) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/waitSearchMaterproByCode',
    method: 'get',
    params: {
      materproCode,
      sort
    }
  })
}
//已选物性查询
//materproCode 物性编码,sort 类别
export const alreadySearchMaterproByCode = (materproCode,sort) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/alreadySearchMaterproByCode',
    method: 'get',
    params: {
      materproCode,
      sort
    }
  })
}
