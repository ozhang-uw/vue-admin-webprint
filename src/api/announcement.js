import request from '@/utils/request'

export function getText(params) {
  return request({
    url: '/announcement/text',
    method: 'get',
    params
  })
}
