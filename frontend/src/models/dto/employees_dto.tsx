import { EmployeeRole } from "../enums/role_enums";

export interface Employees {
    id : string;
    name : string;
    username : string;
    email : string;
    role : EmployeeRole;
    isAssignedTask: boolean;
}