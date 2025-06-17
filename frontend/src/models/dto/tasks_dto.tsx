import { TaskPriority } from "../enums/tasks_priority_enums"

export interface TaskDTO {
    id : string,
    employeeId? : string
    client_name : string,
    description : string,
    client_address : string,
    latitude: number,
    longitude: number
    due_date : string,
    priority : TaskPriority
}

export interface AssignTaskDTO {

}

