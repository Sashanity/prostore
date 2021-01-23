import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const auth = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // split bearer and fish out token itself
            token = req.headers.authorization.split(' ')[1]

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decodedToken)

            // add user info tot he request, dont pass password
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not auth. Token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not auth. No token passed')
    }
})