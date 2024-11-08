exports.check_session_middleware = async (req, res, next) => {
    try {
        if (req.session.details) {
            next();
        } else {
            return res.status(401).json({ status: false, body: "Unauthorized Error. Session Not Found" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, status_code: 500, message: "Internal Server Error" })
    }
}