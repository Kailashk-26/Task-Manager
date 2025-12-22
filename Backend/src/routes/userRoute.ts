import express from 'express'
import { deleteAcc, getAllUsers, loginUser, logoutUser, regUser, updateUser } from '../controllers/userController.ts'
import { protect } from '../middleware/authMiddleware.ts'

const userRoute=express.Router()

userRoute.post('/reg',regUser)
userRoute.post('/login',loginUser)
userRoute.get('/getAll',protect,getAllUsers)
userRoute.delete('/del',protect,deleteAcc)
userRoute.post('/logout',protect,logoutUser)
userRoute.put('/update',protect,updateUser)

export default userRoute;