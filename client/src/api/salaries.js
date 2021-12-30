import { apiBaseAuthenticated } from "./base";

const BASE_PATH = '/salary'

const create = (body) => {
  return apiBaseAuthenticated('post', `${BASE_PATH}/create`, body)
}
const update = (body) => {
  return apiBaseAuthenticated('put', `${BASE_PATH}/update`, body)
}

const fetch = () => {
  return apiBaseAuthenticated('get', `${BASE_PATH}/get`)
}
const deleteIt = (product) => {
  return apiBaseAuthenticated('delete', `${BASE_PATH}/update`, product)
}

const api = { create, fetch, update, deleteIt }

export default api