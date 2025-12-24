import { Edit, MoveLeftIcon, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../configs/api";

const Profile = () => {
  type User = {
    _id: string;
    name: string;
    email: string;
    jobPosition?: string;
  };

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get<User>("/api/users/check");
      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-3">
      <div className="max-w-3xl mx-auto p-6 border rounded-2xl shadow-sm bg-white">
        <button onClick={()=>navigate('/')} className="cursor-pointer sticky left-3 top-3 bg-gray-400 rounded-full p-2">
          <MoveLeftIcon/>
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-2 rounded"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-between items-center">
          <div className="w-full sm:w-2/3 space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-500">ID</span>
              <span className="font-medium text-gray-800">{user._id}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-500">Name</span>
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium text-gray-800">{user.email}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-500">Position</span>
              <span className="font-medium text-gray-800">{user.jobPosition}</span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-3">
            <button onClick={()=>navigate(`/profile/${user._id}`)} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Edit size={18} />
              Edit
            </button>

            <button onClick={()=>navigate('/profile/delete')} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Trash size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
