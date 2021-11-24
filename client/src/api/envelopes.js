import { apiBaseAuthenticated } from "./base";

const BASE_PATH = '/envelopes'

const create = (body) => {
  return apiBaseAuthenticated('post', `${BASE_PATH}/create`, body)
}
const update = (body) => {
  return apiBaseAuthenticated('put', `${BASE_PATH}/update`, body)
}
const transfer = (body) => {
  return apiBaseAuthenticated('put', `${BASE_PATH}/transfer`, body)
}

const fetch = () => {
  return apiBaseAuthenticated('get', `${BASE_PATH}/get`)
}
const deleteIt = (product) => {
  return apiBaseAuthenticated('delete', `${BASE_PATH}/update`, product)
}

const api = { create, fetch, update, transfer, deleteIt }

export default api