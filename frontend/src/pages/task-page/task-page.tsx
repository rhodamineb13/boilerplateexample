import { JSX, useEffect } from 'react';
import './task-page.scss'; // Assuming you have a CSS file for styling
import { Params, useParams } from 'react-router-dom';


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
            <h1>Task Page: {param.taskId}</h1>
            <p>This is the task page where you can manage your tasks.</p>
            {/* Add your task management components here */}
        </div>
    );
}   