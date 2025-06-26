import { AxiosError, AxiosResponse } from 'axios';
import { Employees } from '../models/dto/employees_dto';
import { client } from './api_client';


export function GetUnassignedSurveyors() : Promise<Employees[]> {
    return client.get("api/surveyors/unassigned")
            .then((res: AxiosResponse) => {
                console.log(res)
                return res.data.data as Employees[]
            })
            .catch((err : AxiosError) => {
                throw err;
    })
}

export function GetAssignedSurveyors() : Promise<Employees[]> {
    return client.get("api/surveyors/assigned")
            .then((res : AxiosResponse) => {
                return res.data.data as Employees[]
            })
            .catch((err : AxiosError) => {
                throw err;
            })
}