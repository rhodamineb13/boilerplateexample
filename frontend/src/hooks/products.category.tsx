import axios, {AxiosResponse, AxiosInstance} from 'axios'

interface Category {
    id : number,
    name : string,
    parent_id?  : number,
    categories? : Category[]
}

const client : AxiosInstance = axios.create({
    baseURL: 'localhost:8080/public'
})

export function GetProductCategories() : Promise<Category[]> {
    return client.get("/categories")
    .then((res : AxiosResponse) => res.data as Category[])
    .catch((err) => {
        throw err;
    })
}