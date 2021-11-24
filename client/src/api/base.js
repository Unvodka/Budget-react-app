import axios from "axios"

const BASE_URL = `http://localhost:3005`

export const apiBase = async (method, path, body, config) => {
  
  if (method === 'get') {
    return axios[method](`${BASE_URL}${path}`, config)
    
  } else if (method === 'delete') {

    const newConfig = {...config, data: body }
    return axios[method](`${BASE_URL}${path}`, newConfig)
  }

  return axios[method](`${BASE_URL}${path}`, body, config)
}

export const apiBaseAuthenticated = async (method, path, body) => {
  const config = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  return apiBase(method, path, body, config)
}

const api = { apiBase, apiBaseAuthenticated}

export default api