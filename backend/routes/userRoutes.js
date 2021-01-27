import express from 'express'
import { userAuth, userCreate, getProfile, updateProfile, getListOfUsers } from '../handlers/userRoutesHandlers.js'
import { auth } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.post('/signin', userAuth)
router.route('/profile').get(auth, getProfile).put(auth, updateProfile)
router.route('/').post(userCreate).get(auth, adminAuth, getListOfUsers)

export default router