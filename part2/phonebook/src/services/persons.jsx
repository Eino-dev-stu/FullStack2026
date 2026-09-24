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
  const fullUrl = baseUrl.concat(url.concat("/"))
  console.log("URL", baseUrl, url, fullUrl)

  return axios.delete(url.concat("/"))
}
const edit = (url, number) => {
  console.log("edit data", baseUrl, url, number)
  return axios.put(baseUrl.concat("/").concat(url), number)
}

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  edit: edit,
}
