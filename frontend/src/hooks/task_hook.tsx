import { useState, useEffect } from 'react';
import { TaskDTO } from '../models/dto/tasks_dto';
import { GetAllTasks } from '../api/tasks';

export function EmployeeHooks() {
    const [taskData, setTaskData] = useState<TaskDTO[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData : () => Promise<void> = async () => {
            try {
                const tasks : TaskDTO[] = await GetAllTasks();
                setTaskData(tasks); 
            }
            catch (err) {
                setError(err as string)
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [])

    return { taskData, error, loading};
}