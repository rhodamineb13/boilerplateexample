export interface TaskModel {
    id : string,
    title: string,
    employeeId : string
    client_name : string,
    description : string,
    address : string,
    due_date : string,
    priority : 'High' | 'Medium' | 'Low',
}
