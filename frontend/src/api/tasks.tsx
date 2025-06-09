import { AxiosResponse, AxiosError } from 'axios';
import { Tasks } from '../models/tasks_dto';
import { client } from './api_client';

export function GetAllTasks(employeeId : string) : Promise<Tasks> {
    return client.get("/tasks", {
        params: {
            employeeId : employeeId
        }
    })
    .then((res : AxiosResponse) => res.data as Tasks)
    .catch((err : AxiosError) => {
        throw err;
    })
}