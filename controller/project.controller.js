const { createProjectQuery, getProjectQuery, editProjectQuery, deleteProjectByIdQuery } = require("../query/project.query")



const createProjectController = async (req, res, next) => {
    try {
        const response = await createProjectQuery(req.body)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
}

const getProjectController = async (req, res, next) => {
    try {
        const response = await getProjectQuery()
        return res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
}

const editProjectController = async (req, res, next) => {
    try {
        const response = await editProjectQuery(req.query.project_id, req.body)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
}


const deleteProjectController = async (req, res, next) => {
    try {
        const response = await deleteProjectByIdQuery(req.query.project_id)
        return res.status(response.statusCode).json(response)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createProjectController,
    getProjectController,
    editProjectController,
    deleteProjectController
}