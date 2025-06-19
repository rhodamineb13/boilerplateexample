import { TaskPriority } from "../enums/tasks_priority_enums"

export interface TaskDTO {
    id : string,
    employeeId? : string
    description : string,
    client_name : string,
    client_address : string,
    latitude: number,
    longitude: number
    due_date : string,
    is_done : boolean,
    priority : TaskPriority
}

export interface AssignTaskDTO {

}

