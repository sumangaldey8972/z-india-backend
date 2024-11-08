const authModel = require("../models/auth.model")



const signUpQuery = async (details) => {
    try {
        const { first_name, last_name, email_address, password } = details
        console.log(details)
        let isExistingEmail = await authModel.findOne({
            email_address: email_address
        })
        console.log(isExistingEmail)

        if (isExistingEmail) {
            return Promise.resolve({
                status: false,
                statusCode: 409,
                message: "an email with this already exist"
            })
        } else {
            const newUser = await authModel.create({
                first_name: first_name,
                last_name: last_name,
                email_address: email_address,
                password: password,
            })
            if (newUser) {
                return Promise.resolve({
                    status: true,
                    statusCode: 201,
                    message: "Success! Welcome aboard! you are now signed up.",
                    userDetails: newUser
                })
            } else {
                return Promise.resolve({
                    status: false,
                    statusCode: 500,
                    message: "Oops! Something went wrong while creating new user"
                })
            }
        }
    } catch (error) {
        return Promise.resolve(error)
    }
}


const signInQuery = async (details) => {
    try {
        const { email_address, password } = details

        const isExistingUser = await authModel.findOne({ email_address: email_address })

        if (isExistingUser) {
            if (isExistingUser.password == password) {
                return Promise.resolve({
                    status: true,
                    statusCode: 200,
                    message: "Success! you are now logged in!",
                    user: isExistingUser
                })
            } else {
                return Promise.resolve({
                    status: false,
                    statusCode: 401,
                    message: "Oops! incorrect password!"
                })
            }
        } else {
            return Promise.resolve({
                status: false,
                statusCode: 401,
                message: "User not found!"
            })
        }


    } catch (error) {
        return Promise.resolve(error)
    }
}

module.exports = {
    signUpQuery,
    signInQuery
}