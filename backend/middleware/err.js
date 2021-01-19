
// middleware to handle errors

// wrong url
const notFound = (req, res, next) => {
    // print attempted url
    const err = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(err)
}

// wrong non mongo id
const errHandler = (err, req, res, next) => {
    const errCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(errCode)
    res.json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack })
}

export { notFound, errHandler } 