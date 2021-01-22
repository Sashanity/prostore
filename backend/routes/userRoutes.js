import express from 'express'
import { userAuth, getProfile } from '../handlers/userRoutesHandlers.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', userAuth)
router.route('/profile').get(auth, getProfile)

export default router