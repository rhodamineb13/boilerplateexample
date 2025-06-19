import { AxiosResponse, AxiosError } from 'axios';
import { TaskDTO } from '../models/dto/tasks_dto';
import { client } from './api_client';
import { PaginatedResponse } from '../models/dto/paginated_dto';


export function GetAllTasks(limit? : number, page? : number, search? : string) : Promise<PaginatedResponse<TaskDTO>> {
    return client.get("/api/tasks", {
        params: {
            limit: limit,
            page: page,
            search: search
        }
    })
    .then((res : AxiosResponse) => {
        console.log(res.config.params)
        return res.data.data as PaginatedResponse<TaskDTO>
    })
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
