import { AxiosError, AxiosResponse } from 'axios';
import { Employees } from '../models/dto/employees_dto';
import { client } from './api_client';
import { EmployeeRole } from '../models/enums/role_enums';

const EmployeesExample : Employees[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'jdoe1999',
        email: 'johndoe_1999@example.com',
        role: EmployeeRole.Admin,
        isAssignedTask: false,
    },
    {
        id: '2',
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'doejane@example.com',
        role: EmployeeRole.Surveyor,
        isAssignedTask: false,
    },
    {
        id: '3',
        name: 'John Smith',
        username: 'smithyjohn',
        email: 'sjohn2000@example.com',
        role: EmployeeRole.Surveyor,
        isAssignedTask: false,
    },
    {
        id: '4',
        name: 'John Hancock',
        username: 'hanjohncock',
        email: 'jh180588@example.com',
        role: EmployeeRole.Surveyor,
        isAssignedTask: false,
    },
    {
        id: '5',
        name: 'George Smith',
        username: 'gsmith',
        email: 'gsmith11@example.com',
        role: EmployeeRole.Admin,
        isAssignedTask: false,
    },
    {
        id: '6',
        name: 'Mary Callagher',
        username: 'mcall11',
        email: 'marycallagher@example.com',
        role: EmployeeRole.BranchManager,
        isAssignedTask: false,
    }
].filter((emp : Employees) => emp.role === EmployeeRole.Surveyor);

export function GetSurveyor() : Promise<Employees[]> {
    return client.get("/employees", 
        {
            params: {
                role: 'surveyor'
            }
        }
    )
    .then((res : AxiosResponse) => res.data as Employees[])
    .catch((err : AxiosError) => {
        throw err;
    })
}

export function GetAllEmployees() : Promise<Employees[]> {
    return client.get("/api/employees")
    .then((res : AxiosResponse) => res.data.data as Employees[])
    .catch((err : AxiosError) => {
        throw err;
    })
}