// check if user is auth as admin

export const adminAuth = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not an Admin')
    }
}