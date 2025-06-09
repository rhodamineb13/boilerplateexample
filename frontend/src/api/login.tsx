import { AxiosError, AxiosResponse } from 'axios';
import { client } from './api_client';
import { LoginDTO } from '../models/login_dto';

export function Login(data : LoginDTO) : Promise<void> {
    return client.post("/login", data)
    .then((res : AxiosResponse) => alert(`${res.data}`))
    .catch((err : AxiosError) => alert(err))
}