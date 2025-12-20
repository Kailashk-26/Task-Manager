import { Users } from 'lucide-react'
import { users } from '../constant'

const Sidebar = () => {
  return (
    <div className='min-h-screen text-gray-200 '>
      {/* large screens */}
      <div className="hidden md:block w-80 bg-base-200 min-h-full p-4">
        <p className='text-xl font-bold my-3 text-center'>Members</p>
        <ul className="menu">
          {users.map((user,i)=>(
            <li key={i}><a>{user.name}</a></li>
          ))
          }
        </ul>
      </div>

      {/* small screens */}
      <div className="drawer md:hidden">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-1" className="btn bg-indigo-400 text-black fixed left-4 bottom-4 z-2">
            <Users/>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {users.map((user,i)=>(
              <li key={i}><a>{user.name}</a></li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar