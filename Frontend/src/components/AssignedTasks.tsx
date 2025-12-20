import { useNavigate } from 'react-router-dom'
import { tasks, users } from '../constant'

const AssignedTasks = () => {
    const navigate=useNavigate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if(tasks.length===0){
        return <div className="flex items-center justify-center gap-2 p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">No Tasks</div>
    }

    return (
        <div className='my-2'>
            {tasks.map((task,i)=>{
            const due = new Date(task.dueDate)
            due.setHours(0, 0, 0, 0)
            const diffTime = due.getTime() - today.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return (
            <div key={i} onClick={()=>navigate(`/tasks/${task.id}`)} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="font-semibold text-gray-700">{task.id}</p>
                    <p className="text-gray-400">.</p>
                    <p className="text-gray-800">{task.title}</p>
                    {users
                    .filter(user => user.id === task.creatorId)
                    .map((user,i) => (
                        <p key={i} className="text-gray-800 font-light">
                            - Assigned By {user.name}
                        </p>
                    ))}
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">{task.status}</p>
                    <p className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">{task.priority}</p>
                        {diffDays<0 ?  <p className='px-2 py-1 rounded bg-red-800 text-white text-xs font-medium'>Overdue</p>:
                        <p className='px-2 py-1 rounded bg-gray-800 text-white text-xs font-medium'>{task.dueDate.split("T")[0]}</p>}
                </div>
            </div>
            )
        })}
        </div>
    )
}

export default AssignedTasks
