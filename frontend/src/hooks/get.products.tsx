import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Products {
    id : number,
    name : string,
    category_id : number,
    description : string
    price : number,
    sku : number
}

const client : AxiosInstance = axios.create({
    baseURL: 'localhost:8080/public'
})

export function GetProducts(by : "latest" | "most-viewed" | "best-seller") : Promise<Products[]> {
    const param : any = {
        by : by,
    };

    return client.get("/products", param)
    .then((res : AxiosResponse) => res.data as Products[])
    .catch((err) => {
        throw err
    });

}

export function GetProductByCategories(category: number, subcategory : number | undefined) : Promise<Products[]> {

    return client.get(`/products?category=${category}` + (subcategory ? `subcategory=${subcategory}` : ''))
    .then((res : AxiosResponse) => res.data as Products[])
    .catch((err) => {
        throw err;
    });

}