import { MessageCircleQuestionMark, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { AxiosError } from 'axios'
import api from '../configs/api'

const CreatedTasks = () => {
    type Task = {
        _id: string
        title: string
        dueDate: string
        priority: string
        status: string
        assignedToId: {
            _id: string
            name: string
            email: string
        }
    }
    const navigate=useNavigate()
    const[clickedCancel,setClickedCancel]=useState(false)
    const [tasks,setTasks]=useState<Task[]>([]);
    useEffect(()=>{
        const getTasks=async()=>{
            try{
                const {data}=await api.get('/api/tasks/created')
                setTasks(data)
            }catch(err){
                const error = err as AxiosError<{ message: string }>
                toast.error(error.response?.data?.message || error.message)
            }
        }
        getTasks()
    },[])
    const today = new Date()
    today.setHours(0, 0, 0, 0)
  return (
    <div className='my-2'>
        <div onClick={()=>navigate('/tasks/create')} className="flex items-start justify-center gap-2 p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">
            <Plus/> Create Task
        </div>
        {tasks.map((task,i)=>{
            const due = new Date(task.dueDate)
            due.setHours(0, 0, 0, 0)
            const diffTime = due.getTime() - today.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return (
            <div key={i} onClick={()=>navigate(`/tasks/${task._id}`)} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 mb-2 rounded-lg bg-gray-100 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={()=>setClickedCancel(!clickedCancel)} className='px-2 py-1 rounded bg-red-800 text-black cursor-pointer'>
                        <X size={10}/>
                    </button>
                    <p className="font-semibold text-gray-700">{task._id.slice(-4)}</p>
                    <p className="text-gray-400">.</p>
                    <p className="text-gray-800">{task.title}</p>
                    <p className="text-gray-800 font-light">
                            - Assigned to {task.assignedToId.name}
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">{task.status}</p>
                    <p className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">{task.priority}</p>
                        {diffDays<0 ?  <p className='px-2 py-1 rounded bg-red-800 text-white text-xs font-medium'>Overdue</p>:
                        <p className='px-2 py-1 rounded bg-gray-800 text-white text-xs font-medium'>{task.dueDate.split("T")[0]}</p>}
                </div>
            </div>
            )
        }
        )}
        {clickedCancel &&
            <div className='fixed inset-0 z-5 flex items-center justify-center bg-gray-700/70 backdrop-blur-sm'>
                <div className='bg-neutral-600 text-white px-6 py-3 flex flex-col items-center justify-center rounded'>
                    <MessageCircleQuestionMark/>
                    <p className='mt-3'>Do you want to close the task?</p>
                    <div className='flex gap-4 p-5'>
                        <button className='px-4 py-2 bg-black rounded'>Yes</button>
                        <button onClick={()=>setClickedCancel(!clickedCancel)} className='px-4 py-2 border rounded'>No</button>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default CreatedTasks