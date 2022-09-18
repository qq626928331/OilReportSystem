import request from '@/router/axios';

//更新 APP端物料物性匹配关系
export const update = (matterproDisplay) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/update',
    method: 'post',
    data: matterproDisplay
  })
}

//获取物料是否为 app关键物料
export const isKeyMateriel = (materielId) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/isKeyMateriel',
    method: 'post',
    params: {
      materielId
    }
  })
}


//获取物料是否为 app关键物料
export const addOrDelete = (materielId,isflag) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/addOrDelete',
    method: 'post',
    params: {
      materielId,
      isflag,
    }
  })
}

//获取物料所分析物性合集
export const selectUnionMatterpro = (materielId,matterproCode) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/selectUnionMatterpro',
    method: 'post',
    params: {
      materielId,
      matterproCode,
    }
  })
}

//获取物料在app端展示的关键物性
export const getSelectMatterpro = (materielId,matterproCode) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/getSelectMatterpro',
    method: 'post',
    params: {
      materielId,
      matterproCode,
    }
  })
}

//右箭头 待选-已选
export const waitToAlreadyChoose = (ids,materielId) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/waitToAlreadyChoose',
    method: 'post',
    params: {
      ids,
      materielId
    }
  })
}

//右箭头 待选-已选
export const alreadyTowaitChoose = (ids,materielId) => {
  return request({
    url: '/api/qcadmin-oilapp/matterprodisplay/alreadyTowaitChoose',
    method: 'post',
    params: {
      ids,
      materielId
    }
  })
}
