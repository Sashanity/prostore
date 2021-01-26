import express from 'express'
import { userAuth, userCreate, getProfile, updateProfile } from '../handlers/userRoutesHandlers.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', userAuth)
router.route('/profile').get(auth, getProfile).put(auth, updateProfile)
router.route('/').post(userCreate)

export default router