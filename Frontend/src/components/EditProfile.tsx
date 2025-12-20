import { useParams } from "react-router-dom"
import ProfileEditForm from "../components/ProfileForm"
import type { ProfileFormValues } from "../types/profile"
import { users } from "../constant"

const EditProfilePage = () => {
  const { id } = useParams<{ id: string }>()

  const user = users.find(u => u.id === id)

  if (!user) {
    return <div className="p-6 text-center">User not found</div>
  }

  const initialData: ProfileFormValues = {
    name: user.name,
    email: user.email,
    jobPosition: user.jobPosition
  }

  const handleUpdate = (data: ProfileFormValues) => {
    console.log("Updated profile:", data)
    // PUT /profile/:id
  }

  return (
    <ProfileEditForm
      initialData={initialData}
      onSubmit={handleUpdate}
    />
  )
}

export default EditProfilePage
