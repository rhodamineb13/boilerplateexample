import { JSX, useEffect, useState } from 'react';
import './main-page.scss'; // Assuming you have a CSS file for styling
import { Dropdown, Table } from 'react-bootstrap';
import { AssignTask, GetAllTasks } from '../../api/tasks';
import { TaskDTO } from '../../models/dto/tasks_dto';

export default function MainPage() : JSX.Element {
    const [tasks, setTasks] = useState<TaskDTO[]>([])
    const [assignedEmployee, setAssignedEmployee] = useState<string>("");
    

    useEffect(() => {
        GetAllTasks().then((t) => setTasks(t))
    }, [])

    const handleSave = () => {
        console.log("clicked bro")
        try {
            async () => await AssignTask("task_id", assignedEmployee)
        }
        catch (err) {
            alert(err)
        }
    }

    return <>
    <div className="task-dashboard">
        <h2 style={{textAlign: "center"}}>TASK DASHBOARD</h2>
        <div className="tasks-table" style={{
            display: 'table',
            margin: '60px auto'
        }}>
            <Table>
                <colgroup>
                <col />
                <col style={{width: '20em'}} />
                <col style={{width: '15em'}} />
                <col style={{width: '15em'}} />
                <col style={{width: '10em'}} />
                <col style={{width: '10em'}} />
                <col style={{width: '10em'}}/>
                <col style={{width: '15em'}} />
                <col />
                <col style={{width: '20em'}} />
                </colgroup>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Description</th>
                        <th>Client Name</th>
                        <th>Client Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        1.
                    </td>
                    <td>
                        Pinjaman Kredit Mobil Avanza Butut Tahun 2008
                    </td>
                    <td>
                        John Smith
                    </td>
                    <td>
                        Jl. Jalan, no. 123 RT 004 RW 005, Ngarang Bebas
                    </td>
                    <td>
                        -34.2210021
                    </td>
                    <td>
                        144.801002
                    </td>
                    <td>
                        Sudrajat 
                    </td>
                    <td>
                        2025-08-17
                    </td>
                    <td>high</td>
                    <td style={{display: 'flex'}}>
                        <Dropdown onSelect={(_, e) => setAssignedEmployee((e.target as HTMLElement).innerText)}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{width: '15em'}}>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <i className="fa-solid fa-floppy-disk fa-2x" onClick={handleSave}></i>
                    </td>
                    </tr>
                    {tasks.map((task : TaskDTO, idx : number) => (
                    <tr>    
                        <td>{idx}</td>
                        <td>{task.description}</td>
                        <td>{task.client_name}</td>
                        <td>{task.client_address}</td>
                        <td>{task.latitude}</td>
                        <td>{task.longitude}</td>
                        <td>{task.due_date}</td>
                        <td>{task.priority}</td>
                        <td style={{display: 'flex'}}>
                            <Dropdown onSelect={(_, e) => setAssignedEmployee((e.target as HTMLElement).innerText)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '15em'}}>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <i className="fa-solid fa-floppy-disk fa-2x" onClick={handleSave}></i>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </div>    
    </>
}