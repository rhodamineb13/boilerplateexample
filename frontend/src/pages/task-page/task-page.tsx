import React, { JSX, useEffect, useState } from 'react';
import './task-page.scss'; // Assuming you have a CSS file for styling
import { Pagination,  Table } from 'react-bootstrap';
import { GetAllTasks } from '../../api/tasks';
import { TaskDTO } from '../../models/dto/tasks_dto';
import { PaginatedResponse } from '../../models/dto/paginated_dto';

export default function TaskPage(): JSX.Element {
    const [tasks, setTasks] = useState<TaskDTO[]>([]); // Initialize as empty array
    const [totalEntries, setTotalEntries] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [limit, setPageLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        setPage(1)
    }, [limit, search])

    useEffect(() => {
        GetAllTasks(limit, page, search).then((t : PaginatedResponse<TaskDTO>) => {
            setTasks(t.data);
            setTotalEntries(t.total);
            console.log(t)
        });
    }, [page, limit, search]);

    const firstIndex = (page - 1) * limit + 1;
    const lastIndex  = Math.min(page * limit, totalEntries);
    const totalPages = Math.ceil(totalEntries / limit);

    const renderPaginationItems = () => {
        const items = [];
        for (let num = 1; num <= totalPages; num++) {
            if (
                num === 1 ||
                num === totalPages ||
                (num >= page - 2 && num <= page + 2)
            ) {
                items.push(
                <Pagination.Item
                    key={num}
                    active={num === page}
                    onClick={() => setPage(num)}
                >
                    {num}
                </Pagination.Item>
                );
            } else if (num === page - 3 || num === page + 3) {
                items.push(<Pagination.Ellipsis key={`e${num}`} disabled />);
            }
        }
        return items;
    };

    

    return (
        <>
                <div className="task-dashboard">
                <h1 style={{textAlign: "center"}}>TASK DASHBOARD</h1>
                <div className = "task-statistics" style={{display:'flex', marginTop: '40px', justifyContent: 'center', gap: '50px'}}>
                    <div className="task-count" style={{width: '300px', height: '150px', borderRadius: '8px', boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{backgroundColor: '#002f5f', position: 'relative'}}>
                            <h4 style={{display: 'flex', marginTop: '10px', justifyContent: 'center', color: 'white'}}>
                            TASKS TOTAL
                            </h4>
                        </div>
                        <span className="task-number">{totalEntries}</span>
                    </div>
                    <div className="task-count" style={{width: '300px', height: '150px', borderRadius: '8px', boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{backgroundColor: '#002f5f', position: 'relative'}}>
                            <h4 style={{display: 'flex', marginTop: '10px', justifyContent: 'center', color: 'white'}}>
                            TASKS TOTAL
                            </h4>
                        </div>
                        <span className="task-number">{totalEntries}</span>
                    </div>
                    <div className="task-count" style={{width: '300px', height: '150px', borderRadius: '8px', boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{backgroundColor: '#002f5f', position: 'relative'}}>
                            <h4 style={{display: 'flex', marginTop: '10px', justifyContent: 'center', color: 'white'}}>
                            TASKS TOTAL
                            </h4>
                        </div>
                        <span className="task-number">{totalEntries}</span>
                    </div>
                </div>
                <div className="tasks-table" style={{
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
                            name="limit" 
                            id="limit" 
                            className="form-select"
                            style={{width: '5em', marginLeft:'5px', marginRight:'10px'}}
                            onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                               const lim : number = parseInt(e.target.value);
                               setPageLimit(lim);
                            }}
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
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                            setSearch(e.target.value)
                            }}
                        />
                        </form>
                    </div>
                    <Table striped>
                        <colgroup>
                        <col style={{width: '5%'}}  />
                        <col style={{width: '10%'}} />
                        <col style={{width: '15%'}} />
                        <col style={{width: '15%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '10%'}} />
                        <col style={{width: '12%'}} />
                        <col style={{width: '13%'}} />
                        <col style={{width: '5%'}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div className='d-flex justify-content-between align-items-center'>No. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Description. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Client Name. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Client Address. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Latitude. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Longitude. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Assigned To. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Due Date. <i className="fa-solid fa-sort"></i></div></th>
                                <th><div className='d-flex justify-content-between align-items-center'>Priority. <i className="fa-solid fa-sort"></i></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task: TaskDTO, idx: number) => (
                                <tr key={task.id}>
                                    <td>{firstIndex + idx}</td>
                                    <td>{task.description}</td>
                                    <td>{task.client_name}</td>
                                    <td>{task.client_address}</td>
                                    <td>{task.latitude}</td>
                                    <td>{task.longitude}</td>
                                    <td> </td>
                                    <td> </td>
                                    <td>{task.priority}</td>
                                </tr>
                                ))}
                            </tbody>
                    </Table>
                    <span>Showing {firstIndex} to {lastIndex} of {totalEntries} entries</span>
                    <div className='pagination d-flex justify-content-center mt-3'>
                        <Pagination onClick={() => window.scrollTo(0, 0)}>
                            <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
                                <Pagination.Prev
                                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                />
                                {renderPaginationItems()}
                                <Pagination.Next
                                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                    disabled={page === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => setPage(totalPages)}
                                    disabled={page === totalPages}
                                />
                            </Pagination>
                    </div>
                    
                </div>
            </div>
        </>
    )
}   