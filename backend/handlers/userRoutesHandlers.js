import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import User from '../models/userModel.js'
import { generateToken } from '../util/generateToken.js'

/*
@desc    Create a new user
@route   POST /api/users
@ access Public
*/
export const userCreate = asyncHandler(async (req, res) => {

    const { email, password, name } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('This email alredy used')
    }
    else {
        const user = await User.create({
            name,
            email,
            password

        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid user data')
        }

    }
})

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
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})

/*
@desc    Get user Profile
@route   PUT /api/users/profile
@ access Private
*/
export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        //save to db
        const updated = await user.save()
        res.json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            isAdmin: updated.isAdmin,
            token: generateToken(updated._id)
        })
    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})

/*
@desc    ADMIN Get user list 
@route   GET /api/users/
@ access Private, Admin
*/
export const getListOfUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

})