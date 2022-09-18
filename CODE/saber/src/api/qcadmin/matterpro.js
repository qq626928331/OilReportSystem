import request from '@/router/axios';
//加载物性
//current 当前页, size 页码, params 查询集合
export const getList = (current, size, params) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
//获取物性
//id 物性id
export const getDetail = (id) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/detail',
    method: 'get',
    params: {
      id
    }
  })
}
//删除物性
//ids 物性id集合
export const remove = (ids) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
//添加物性
//row 物性行数据
export const add = (row) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/submit',
    method: 'post',
    data: row
  })
}
//物性修改
//row 物性行数据
export const update = (row) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/submit',
    method: 'post',
    data: row
  })
}

//根据物性编码  获取物性拥有的单位
//matterproCode 物性编码
export const getGridData = (matterproCode) => {
  return request({
    url: '/api/qcadmin-matterpro/matterpro/getmatterproUnit',
    method: 'get',
    params:{
      matterproCode
    }
  })
}
