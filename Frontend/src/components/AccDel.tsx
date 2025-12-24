import api from "../configs/api"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const DeleteAccountPage = () => {
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      toast.error('Type "DELETE" to confirm')
      return
    }

    try {
      const{data}=await api.delete("/api/users/del")
      toast.success(data.message)

      localStorage.removeItem("token")
      navigate("/reg")
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || error.message)
    }
  }


  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            Delete Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Warning */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Deleting your account will permanently remove all your data.
        </div>

        {/* Confirmation input */}
        <div>
          <label className="text-sm text-gray-600">
            Type <span className="font-semibold">DELETE</span> to confirm
          </label>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountPage
