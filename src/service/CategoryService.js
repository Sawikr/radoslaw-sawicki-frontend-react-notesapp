import axios from "axios";
import {BASE_URL} from "../http-common";

export const getAll = () =>
    axios.get(BASE_URL + '/notes/category')

export const get = id =>
    axios.get(BASE_URL + `/notes/category${id}`)

export const createCategory = data =>
    axios.post(BASE_URL + '/notes/category', data)

export const saveCategory = (category) => sessionStorage.setItem("category", category);

export const getCategory = () => {
    let category;
    return category = sessionStorage.getItem("category");
}

// eslint-disable-next-line
export default { getAll, get, createCategory };