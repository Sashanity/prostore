import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import User from '../models/userModel.js'
import { generateToken } from '../util/generateToken.js'


/*
@desc    Authenticate user and get token
@route   POST /api/users/signin
@ access Public
*/
export const userAuth = asyncHandler(async (req, res) => {
    // let userLogin = {
    //     email: req.body.email,
    //     password: req.body.password
    // }

    // destructure request data
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.checkPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

/*
@desc    Get user Profile
@route   GET /api/users/profile
@ access Private
*/
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    // res.send("Success")
    if (user) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})
