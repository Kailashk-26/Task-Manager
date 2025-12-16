import { tasks } from '../constant'

const AssignedTasks = () => {
  return (
    <div className='my-2'>
        {tasks.map((task,i)=>(
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="font-semibold text-gray-700">{task.id}</p>
                    <p className="text-gray-400">.</p>
                    <p className="text-gray-800">{task.title}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">{task.status}</p>
                    <p className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">{task.priority}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default AssignedTasks