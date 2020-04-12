import {request} from "./request";

export function getUserMsg() {
  return request({
    url:'/users/selectAll'
  })
}

export function updateUserMsg() {
  return request({
    url:'/users/update',
  })
}
