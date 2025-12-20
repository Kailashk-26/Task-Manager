import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema } from "../types/profile"
import type { ProfileFormValues } from "../types/profile"

type ProfileEditFormProps = {
  initialData: ProfileFormValues
  onSubmit: (data: ProfileFormValues) => void
}

const ProfileEditForm = ({ initialData, onSubmit }: ProfileEditFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData
  })

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            {...register("name")}
            className="mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            {...register("email")}
            disabled
            className="mt-1 w-full p-2.5 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Job Position */}
        <div>
          <label className="text-sm text-gray-600">Job Position</label>
          <input
            {...register("jobPosition")}
            className="mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.jobPosition && (
            <p className="text-red-500 text-sm">
              {errors.jobPosition.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default ProfileEditForm
