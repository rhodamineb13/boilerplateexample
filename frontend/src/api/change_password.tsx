import { AxiosResponse } from 'axios';
import { client }  from './api_client';

export function ChangePassword() : Promise<void> {
    return client.post("/change-password")
    .then((res : AxiosResponse) => alert(res.data.message))
    .catch((err) => console.log(err))
}