import { JSX } from 'react';
import './main-page.scss'; // Assuming you have a CSS file for styling
import profilePic from '../../assets/default-profile-placeholder-mfby2k0rliz1szsn.png'
import Tasks, { TaskProps, TaskModel } from '../../components/tasks/tasks';

export default function MainPage() : JSX.Element {

    return <>
    <div className="profile-dashboard">
        <div className="profile-picture">
            <img src={profilePic} alt="Profile" width={'125px'} />
        </div>
        <div className="profile-info">
            <h1 className="profile-name">JOHN DOE</h1>
            <p className="profile-bio">Surveyor</p>
        </div>
    </div>
    <div className="tasks-container">
        <Tasks
            data={[
                {
                    id: '1',
                    title: 'Task 1',
                    description: 'Description for Task 1',
                    completed: false,
                    dueDate: '2023-10-15T12:00:00Z',
                    priority: 'high'
                },
                {
                    id: '2',
                    title: 'Task 2',
                    description: 'Description for Task 2',
                    completed: true,
                    dueDate: '2023-10-16T12:00:00Z',
                    priority: 'medium'
                },
                {
                    id: '3',
                    title: 'Task 3',
                    description: 'Description for Task 3',
                    completed: false,
                    dueDate: '2023-10-17T12:00:00Z',
                    priority: 'low'
                },
                {
                    id: '4',
                    title: 'Task 4',
                    description: 'Description for Task 4',
                    completed: false,
                    dueDate: '2023-10-18T12:00:00Z',
                    priority: 'high'
                }
            ]}
            onTaskAdd={(task: TaskModel) => console.log('Task added:', task)}
            onTaskUpdate={(task: TaskModel) => console.log('Task updated:', task)}
            onTaskDelete={(taskId: string) => console.log('Task deleted:', taskId)}
            onTaskComplete={(taskId: string, completed: boolean) => console.log('Task completed:', taskId, completed)}
            onTaskFilter={(filter: 'all' | 'completed' | 'pending') => console.log('Task filter:', filter)}
        />
    </div>
    </>
}