import { JSX, useEffect } from 'react';
import './task-page.scss'; // Assuming you have a CSS file for styling
import { Params, useParams } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';


export default function TaskPage(): JSX.Element {
    const param : Readonly<Params<string>> = useParams<string>();

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    },[])

    console.log(param)
    return (
        <div className="task-page">
            <h1>Task Page: {param.id}</h1>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <a>Dropdown Buttona</a>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </div>
        </div>
    );
}   