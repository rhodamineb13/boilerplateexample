import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Product {
    id : number,
    name : string,
    imageURL : string,
    category_id : number,
    description : string
    price : number,
    sku : number
}

const client : AxiosInstance = axios.create({
    baseURL: 'localhost:8080/public'
})

export function GetSpecificProduct(id: number): Promise<Product> {
    return client.get("/product/" + id)
        .then((response: AxiosResponse) => response.data as Product)
        .catch((err) => {
            console.log(err);
            throw err; // Re-throw to let the caller handle the error
        });
}