import axios from "axios"
const baseUrl = "http://localhost:3001/api/persons/"

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}
const remove = (url) => {
  console.log("URL", url)
  return axios.delete(url)
}
const edit = (url, number) => {
  console.log("edit data", url, number)
  return axios.put(baseUrl.concat(url), number)
}

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  edit: edit,
}
