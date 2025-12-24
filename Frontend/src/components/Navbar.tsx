import { ClipboardList, LogOut, MessageCircleQuestionMark, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import api from '../configs/api'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [logoutButton,setLogoutButton]=useState(false)
    const navigate=useNavigate()
    const goProfile=()=>{
        navigate('/profile')
    }
    const goToTasks=()=>{
        navigate('/tasks')
    }
    const logout=async()=>{
        try {
           const {data}= await api.post("/api/users/logout") 
           toast.success(data.message)
        } catch{
           toast.error("Logout Failed")
        } finally {
            localStorage.removeItem("token") // 🔥 THIS logs out user
            window.location.href = "/reg"
        }
    }
  return (
    <div>
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
                <button onClick={()=>setLogoutButton(!logoutButton)} className="btn btn-ghost btn-circle">
                    <LogOut/>
                </button>
                {logoutButton && 
                    <div className='fixed inset-0 z-5 flex items-center justify-center bg-gray-700/70 backdrop-blur-sm'>
                        <div className='bg-neutral-600 text-white px-6 py-3 flex flex-col items-center justify-center rounded'>
                            <MessageCircleQuestionMark/>
                            <p className='mt-3'>Do you want to Logout?</p>
                            <div className='flex gap-4 p-5'>
                                <button onClick={()=>logout()} className='px-4 py-2 bg-black rounded'>Yes</button>
                                <button onClick={()=>setLogoutButton(!logoutButton)} className='px-4 py-2 border rounded'>No</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar