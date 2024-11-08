const { signUpQuery, signInQuery } = require("../query/auth.query");


const signUpController = async (req, res, next) => {
    try {
        const response = await signUpQuery(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};


const signInController = async (req, res, next) => {
    try {
        const response = await signInQuery(req.body);

        if (response.status) {
            req.session.details = response.user;
            req.session.save((err) => {
                if (err) throw err
            })
        }

        return res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUpController,
    signInController
}