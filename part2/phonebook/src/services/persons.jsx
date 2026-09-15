import axios from "axios"
//const baseUrl = "https://fsphonebook-e004.onrender.com/api/persons"
const baseUrl = "/api/persons"
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
