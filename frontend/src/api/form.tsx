import { AxiosResponse, AxiosError } from 'axios';
import { FormDTO } from '../models/form_dto';
import { client } from './api_client';


export function SubmitForm(data : FormDTO) : Promise<void> {
    return client.post("/submit-form", data)
    .then((res : AxiosResponse) => alert( `${res.data}`))
    .catch((err : AxiosError) => alert(err))
}