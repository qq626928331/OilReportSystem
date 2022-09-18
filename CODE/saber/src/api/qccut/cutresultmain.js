import request from '@/router/axios';

//获取切割结果历史记录(根据方案名称模糊查询)
export const getList = (schemeName) => {
  return request({
    url: '/api/qccut-cutresult/cutresultmain/selectList',
    method: 'get',
    params: {
      schemeName
    }
  })
}

//获取切割结果的原油数据(切割历史的主键ID)
export const searchOil = (cutresultId) => {
  return request({
    url: '/api/qccut-cutresult/cutresultmain/searchOil',
    method: 'get',
    params: {
      cutresultId
    }
  })
}

//切割历史结果的导出(原油ID，切割结果主键ID)
export const downloadXml = (oilId,cutresultId) => {
  return request({
    url: '/api/qccut-cutresult/cutresultmain/downloadXml',
    method: 'post',
    params: {
      oilId,
      cutresultId
    }
  })
}

//获取报表接口地址URL
export const  getBaseurl = () => {
  return request({
    url: './home.json',
    method: 'get',
    params: {

    }
  })
}
