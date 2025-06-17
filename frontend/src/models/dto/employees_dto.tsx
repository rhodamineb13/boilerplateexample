import { EmployeeRole } from "../enums/role_enums";

export interface Employees {
    name : string;
    username : string;
    email : string;
    role : EmployeeRole;
    isAssignedTask: boolean;
}