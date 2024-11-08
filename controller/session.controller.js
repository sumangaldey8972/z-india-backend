exports.check_session = (req, res, next) => {
    try {
        if (req.session.details) {
            return res.status(200).json({ status: true, body: req.session.details })
        } else {
            return res.status(404).json({ status: false, status_code: 400, message: "Session not found" })
        }
    } catch (error) {
        next(error)
    }
}


exports.destroy_session = (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ status: false, status_code: 500, message: "Internal Server Error" })
            } else {
                return res.status(200).json({ status: true, status_code: 200, message: "Logout successfull" })
            }
        })
    } catch (error) {
        next(error)
    }
}