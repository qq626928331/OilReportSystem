import request from '@/router/axios';

//根据用户查询是否有调合优化的临时表记录
export const getOptCtMainByUser = (tankNum,materieltypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmain/getOptCtMainByUser',
    method: 'get',
    params: {
      tankNum,
      materieltypeId
    }
  })
}
//根据类型删除所有的信息
export const removeAll = (matterielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmain/removeAll',
    method: 'post',
    params: {
      matterielTypeId
    }
  })
}

//根据传递的临时主表ID进行调和计算
export const optAnalysis = (mainId,matterielTypeId) => {
  return request({
    url: '/api/qcopt-optblend/optctmain/optAnalysis',
    method: 'get',
    params: {
      mainId,
      matterielTypeId
    }
  })
}

//根据传递的临时主表ID查询详细信息
export const detail = (boctmainId) => {
  return request({
    url: '/api/qcopt-optblend/optctmain/detail',
    method: 'get',
    params: {
      boctmainId
    }
  })
}

//更新临时主表中的总量数据
export const updatemain = (optCtMain) => {
  return request({
    url:'/api/qcopt-optblend/optctmain/update',
    method:'post',
    data: optCtMain
  })
}
