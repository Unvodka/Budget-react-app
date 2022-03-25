import { apiBaseAuthenticated } from "./base";

const BASE_PATH = '/user'

const create = (body) => {
  return apiBaseAuthenticated('post', `${BASE_PATH}/create`, body)
}
const update = (body) => {
  return apiBaseAuthenticated('put', `${BASE_PATH}/update`, body)
}

const fetch = () => {
  return apiBaseAuthenticated('get', `${BASE_PATH}/get`)
}
const deleteIt = (body) => {
  return apiBaseAuthenticated('delete', `${BASE_PATH}/update`, body)
}

const api = { create, fetch, update, deleteIt }

export default api