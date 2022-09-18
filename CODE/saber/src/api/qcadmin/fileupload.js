import request from '@/router/fileaxios';

export const upload = (fd) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/uploadCmData',
    method: 'post',
    data:fd
  })
}

export const upload_qd = (fd) => {
  return request({
    url: '/api/qcadmin-oilbase/detailbase/UploadCmQDData',
    method: 'post',
    data:fd
  })
}

