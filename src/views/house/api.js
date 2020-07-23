import axios from 'axios'

// 获取列表分页
export function getHouseList() {
  return axios.get('/api/house/list')
}

/**
 * 作品页面接口
 */

 // 新增合集
 export function addCategory(param = {}) {
   return axios.post('/api/collect/add')
 }

 export function updateCategory() {
   return axios.post('/api/collect/update')
 }

 export function deleteCategory() {
   return axios.post('/api/collect/delete')
 }

 export function getCategoryList() {
   return axios.get('/api/collect/list')
 }
