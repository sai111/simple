import axios from 'axios'

// 获取列表分页
export function getHouseList() {
  return axios.get('/api/house/list')
}
