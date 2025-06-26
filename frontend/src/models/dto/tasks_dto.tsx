import { TaskPriority } from "../enums/tasks_priority_enums"

export interface TaskDTO {
    id : string,
    employee_id? : string,
    employee_name? : string,
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

