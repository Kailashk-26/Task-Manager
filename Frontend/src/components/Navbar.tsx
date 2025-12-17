import { ClipboardList, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
    const goProfile=()=>{
        navigate('/profile')
    }
    const goToTasks=()=>{
        navigate('/tasks')
    }
  return (
    <div className=''>
        <div className="p-3 flex items-center justify-between bg-blue-200 shadow-sm ">
            <div className="navbar-start font-bold">
                <a>Task Manager</a>
            </div>
            <div className="navbar-end">
                <button onClick={()=>goToTasks()} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <ClipboardList/>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
                </button>
                <button onClick={()=>goProfile()} className="btn btn-ghost btn-circle">
                    <User/>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <LogOut/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar