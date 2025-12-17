import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'


function App() {

  return (
    <div className='min-h-screen bg-neutral-300 text-black '>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/reg' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
      </Routes>
    </div>
  )
}

export default App
