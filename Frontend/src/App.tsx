import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'
import CreateTaskPage from './components/CreateTask'
import EditTaskPage from './components/EditTask'
import TaskDetailsPage from './components/TaskDetailsPage'


function App() {

  return (
    <div className='min-h-screen bg-neutral-300 text-black'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/reg' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/tasks" element={<Tasks />} />
        <Route
          path="/tasks/create"
          element={<CreateTaskPage/>}
        />

        <Route
          path="/tasks/edit/:id"
          element={<EditTaskPage/>}
        />
        <Route path="/tasks/:id" element={<TaskDetailsPage/>} />
      </Routes>
    </div>
  )
}

export default App
