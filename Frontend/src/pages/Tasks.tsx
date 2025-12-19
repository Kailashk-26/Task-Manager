import { ChevronDown, ChevronRight, MoveLeftIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CreatedTasks from "../components/CreatedTasks"
import AssignedTasks from "../components/AssignedTasks"
import OverdueTasks from "../components/OverdueTasks"

const Tasks = () => {
  const navigate=useNavigate()
  const [createDropDown,setCreateDropDown]=useState(false)
  const [overDueDropDown,setOverDueDropDown]=useState(false)
  const [assignDropDown,setAssignDropDown]=useState(false)
  return (
    <div>
      <button onClick={()=>navigate('/')} className="cursor-pointer sticky left-3 top-3 bg-gray-400 rounded-full p-2">
        <MoveLeftIcon/>
      </button>
      <p className="flex items-center justify-center font-mono text-2xl">Dashboard</p>
      <div className="mt-8 mx-6 " >
        <p className="gap-1 text-blue-900 text-xl bg-green-200 p-4 rounded-lg flex items-center" onClick={()=>setCreateDropDown(!createDropDown)}>
          {createDropDown ? <ChevronDown />:<ChevronRight />}Created Tasks</p>
        {createDropDown && 
          <div>
            <CreatedTasks/>
          </div>
        }
      </div>
      <div className="mt-2 mx-6" >
        <p className="gap-1 text-blue-900 text-xl bg-indigo-300 p-4 rounded-lg flex items-center" onClick={()=>setAssignDropDown(!assignDropDown)}>
          {assignDropDown ? <ChevronDown />:<ChevronRight />}Assigned Tasks</p>
        {assignDropDown && 
          <div>
            <AssignedTasks/>
          </div>
        }
      </div>
      <div className="mt-2 mx-6">
        <p className="gap-1 text-blue-900 text-xl bg-red-300 p-4 rounded-lg flex items-center" onClick={()=>setOverDueDropDown(!overDueDropDown)}>
          {overDueDropDown ? <ChevronDown />:<ChevronRight />}Overdue Tasks</p>
        {overDueDropDown && 
          <div>
            <OverdueTasks/>
          </div>
        }
      </div>
      
    </div>
  )
}

export default Tasks