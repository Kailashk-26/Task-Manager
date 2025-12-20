import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Plus } from 'lucide-react'
import AssignedTasks from '../components/AssignedTasks'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex flex-col w-full'>
            <Navbar/>
            <Link to={'/tasks/create'} className='m-6 bg-linear-to-r from-indigo-500 to-blue-500 rounded-lg items-center flex flex-col justify-center p-8 shadow-md shadow-black'>
                <Plus/>
                <p>New Task</p>
            </Link>
            <p className='mx-6 font-bold text-2xl mb-2'>Tasks</p>
            <div className='w-full mx-6 h-0.5 bg-black'/>
            <div className='m-6'>
                <AssignedTasks/>
            </div>
        </div>
    </div>
  )
}

export default Home