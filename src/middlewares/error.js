const errorHanlder = (err, req, res, next) => {


    res.status(err.statusCode || 500).json({ message: err.message || "INTERNAL SERVER ERROR" })
}

module.exports = errorHanlder;