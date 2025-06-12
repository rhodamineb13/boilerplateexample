import { JSX }  from 'react';
import './tasks.scss'; // Assuming you have a CSS file for styling
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TaskDTO } from '../../models/dto/tasks_dto';


export interface TaskProps {
    data : TaskDTO[];
    onTaskAdd? : (task: TaskDTO) => void;
    onTaskUpdate? : (task: TaskDTO) => void;
    onTaskDelete? : (taskId: string) => void;
    onTaskComplete? : (taskId: string, completed: boolean) => void;
    onTaskFilter? : (filter: 'all' | 'completed' | 'pending') => void;
}

export default function Tasks(props : TaskProps) : JSX.Element {
    const navigate : NavigateFunction = useNavigate();

    return <>
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
    </>
}