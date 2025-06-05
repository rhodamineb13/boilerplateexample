import { JSX }  from 'react';
import './tasks.scss'; // Assuming you have a CSS file for styling
import { NavigateFunction, useNavigate } from 'react-router-dom';

export interface TaskModel {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string; // ISO date string
    priority: 'low' | 'medium' | 'high';
}

export interface TaskProps {
    data : TaskModel[];
    onTaskAdd : (task: TaskModel) => void;
    onTaskUpdate? : (task: TaskModel) => void;
    onTaskDelete? : (taskId: string) => void;
    onTaskComplete? : (taskId: string, completed: boolean) => void;
    onTaskFilter? : (filter: 'all' | 'completed' | 'pending') => void;
}

export default function Tasks(props : TaskProps) : JSX.Element {
    const navigate : NavigateFunction = useNavigate();

    return <>
        <div className="tasks-container" style={{marginTop: '50px'}}>
            <h2 style={{textAlign: 'center'}}>TASKS</h2>
            <div className="task-list" style={{marginTop: '50px'}}>
                {props.data.map(task => (
                    <div className="task-item" key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                        <div className="task-title-container">
                            <h3 className="task-title">{task.title.toUpperCase()}</h3>
                        </div>
                        <div className="task-info-container">
                            <p className="task-description">{task.description}</p>
                            <p className="task-priority">Priority: {task.priority}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}