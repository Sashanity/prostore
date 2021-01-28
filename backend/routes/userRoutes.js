import express from 'express'
import { userAuth, userCreate, getProfile, updateProfile } from '../handlers/userRoutesHandlers.js'
import { getListOfUsers, deleteUserById, getUserById, updateUserById } from '../handlers/adminAccessRoutesHandlers/adminUserRoutesHandlers.js'
import { auth } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.post('/signin', userAuth)
router.route('/profile')
    .get(auth, getProfile)
    .put(auth, updateProfile)
router.route('/')
    .post(userCreate)
    .get(auth, adminAuth, getListOfUsers)
router.route('/:id')
    .delete(auth, adminAuth, deleteUserById)
    .get(auth, adminAuth, getUserById)
    .put(auth, adminAuth, updateUserById)

export default router