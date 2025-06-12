import { AxiosResponse, AxiosError } from 'axios';
import { TaskDTO } from '../models/dto/tasks_dto';
import { client } from './api_client';



export function GetAllTasks() : Promise<TaskDTO[]> {
    return client.get("/tasks")
    .then((res : AxiosResponse) => res.data as TaskDTO[])
    .catch((err : AxiosError) => {
        throw err;
    });
}

export function AssignTask(id : string, employee_id : string) : Promise<void> {
    return client.post(`/tasks/${id}`, {
        employee_id: employee_id,
    })
    .then((res : AxiosResponse) => alert(`${res.data}`))
    .catch((err) => alert(err))
}
