import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import { generateToken } from '../../util/generateToken.js'

/*
@desc    ADMIN Get user list 
@route   GET /api/users/
@ access Private, Admin
*/
export const getListOfUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

})

/*
@desc    ADMIN Delete user
@route   Delete /api/users/:id
@ access Private, Admin
*/
export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User deleted successfully' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/*
@desc    ADMIN Get user
@route   Get /api/users/:id
@ access Private, Admin
*/
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


/*
@desc    Admin user Profile
@route   PUT /api/users/:id
@ access Private, Admin
*/
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        // keeping change password because admin should be able to do it
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
