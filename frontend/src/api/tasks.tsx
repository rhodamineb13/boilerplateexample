import { AxiosResponse, AxiosError } from 'axios';
import { TaskModel } from '../models/tasks_dto';
import { client } from './api_client';

export function GetAllTasks(employeeId : string) : Promise<TaskModel> {
    return client.get("/tasks", {
        params: {
            employeeId : employeeId
        }
    })
    .then((res : AxiosResponse) => res.data as TaskModel)
    .catch((err : AxiosError) => {
        throw err;
    })
}

export function AssignTask(data : TaskModel) : Promise<void> {
    return client.post("/tasks", data)
    .then((res : AxiosResponse) => alert(`${res.data}`))
    .catch((err) => alert(err))
}