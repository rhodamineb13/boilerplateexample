import { JSX, useEffect, useState } from "react";
import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import { Pagination, Table } from "react-bootstrap";
import { GetAllEmployees } from "../../api/employees";

// Employee interface
export interface Employees {
    name: string;
    username: string;
    email: string;
    role: string; // Assuming EmployeeRole is a string
}

export default function EmployeesPage(): JSX.Element {
    const [employees, setEmployees] = useState<Employees[]>([]);
    const [firstIndex, setFirstIndex] = useState<number>(1);
    const [lastIndex, setLastIndex] = useState<number>(0);
    const numberOfEntries : number = employees.length;


    useEffect(() => {
        GetAllEmployees().then((emps : Employees[]) => {
            setEmployees(emps)
            setLastIndex(emps.length)
        })
    }, [])
    return (
            <>
                    <div className="employee-dashboard">
                    <h1 style={{textAlign: "center"}}>EMPLOYEE LIST</h1>
                    <div className="employee-table" style={{
                        display: 'table',
                        margin: '60px auto',
                        width: '100%'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            width: '100%'
                        }}>
                            <div className="d-flex align-items-center">
                            <label htmlFor="cars" className="me-2">Show</label>
                            <select 
                                name="cars" 
                                id="cars" 
                                className="form-select"
                                style={{width: '5em', marginLeft:'5px', marginRight:'10px'}}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span>entries</span>
                            </div>
    
                            <form className="d-flex align-items-center">
                            <label htmlFor='search' className="me-2">Search: </label>
                            <input 
                                type="text" 
                                id='search' 
                                className="form-control"
                                style={{width: '250px'}}
                            />
                            </form>
                        </div>
                        <div className="justify-content-center">

                        </div>
                        <Table 
                        striped 
                        bordered 
                        responsive 
                        className="mx-auto" 
                        >
                            <colgroup>
                            <col style={{width: '10em'}}  />
                            <col style={{width: '20em'}} />
                            <col style={{width: '20em'}} />
                            <col style={{width: '20em'}} />
                            <col style={{width: '15em'}} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th><div className='d-flex justify-content-between'>No. <i className="fa-solid fa-sort"></i></div></th>
                                    <th><div className='d-flex justify-content-between'>Name. <i className="fa-solid fa-sort"></i></div></th>
                                    <th><div className='d-flex justify-content-between'>Username. <i className="fa-solid fa-sort"></i></div></th>
                                    <th><div className='d-flex justify-content-between'>Email. <i className="fa-solid fa-sort"></i></div></th>
                                    <th><div className='d-flex justify-content-between'>Role. <i className="fa-solid fa-sort"></i></div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp: Employees, idx: number) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.username}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.role}</td>
                                    </tr>
                                    ))}
                                </tbody>
                        </Table>
                        <span>Showing {firstIndex} to {lastIndex} of {numberOfEntries} entries</span>
                        <div className='pagination d-flex justify-content-center mt-3'>
                            <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />
    
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                            </Pagination>
                        </div>
                        
                    </div>
                </div>
            </>
        );
}