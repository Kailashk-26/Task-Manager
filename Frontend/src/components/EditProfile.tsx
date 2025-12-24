import { useEffect, useState } from "react"
import ProfileEditForm from "../components/ProfileForm"
import type { ProfileFormValues } from "../types/profile"
import api from "../configs/api"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

type User = ProfileFormValues & {
  _id: string
}

const EditProfilePage = () => {
  const navigate=useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get<User>("/api/users/check")
        setUser(data)
      } catch (err) {
        const error = err as AxiosError<{ message: string }>
        toast.error(error.response?.data?.message || error.message)
      }
    }

    fetchProfile()
  }, [])

  const handleUpdate = async (data: ProfileFormValues) => {
    try {
      const res = await api.put("/api/users/update", data)
      toast.success(res.data.message)
      navigate(-1)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || err.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <ProfileEditForm
      initialData={{
        name: user.name,
        email: user.email,
        jobPosition: user.jobPosition,
      }}
      onSubmit={handleUpdate}
    />
  )
}

export default EditProfilePage
