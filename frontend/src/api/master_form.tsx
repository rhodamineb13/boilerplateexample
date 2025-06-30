import { AxiosResponse } from 'axios';
import { FormSchema } from '../models/dto/master_form';
import { client } from './api_client';

export function GetMasterForm(by : string) : Promise<FormSchema> {
    return client.get(`/master-form/${by}`)
    .then((res : AxiosResponse) => {
        console.log(res)
        return res.data as FormSchema
    })
    .catch((err) => {
        throw err
    })
}