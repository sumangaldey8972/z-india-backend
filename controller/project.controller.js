const {
	createProjectQuery,
	getProjectQuery,
	editProjectQuery,
	deleteProjectByIdQuery,
} = require("../query/project.query");

const createProjectController = async (req, res, next) => {
	// console.log("files::::", req.files);
	try {
		// Parse JSON fields that were sent as strings
		const configuration = JSON.parse(req.body.configuration);
		const places_nearby = JSON.parse(req.body.places_nearby);

		// Now you can use these as proper arrays/objects
		const projectData = {
			...req.body,
			configuration,
			places_nearby,
		};

		// Now you can pass the parsed data to your query function
		// console.log("Project Data:::::", projectData);
		const response = await createProjectQuery(projectData, req.files);
		return res.status(response.statusCode).json(response);
	} catch (error) {
		next(error);
	}
};

const getProjectController = async (req, res, next) => {
	try {
		const response = await getProjectQuery();
		return res.status(response.statusCode).json(response);
	} catch (error) {
		next(error);
	}
};

const editProjectController = async (req, res, next) => {
	// console.log("files::::", req.files);
	try {
		// Parse JSON fields that were sent as strings
		const configuration = JSON.parse(req.body.configuration);
		const places_nearby = JSON.parse(req.body.places_nearby);

		// Now you can use these as proper arrays/objects
		const projectData = {
			...req.body,
			configuration,
			places_nearby,
		};

		// Now you can pass the parsed data to your query function
		// console.log("Project Data:::::", projectData);
		const response = await editProjectQuery(
			req.query.project_id,
			projectData,
			req.files
		);
		return res.status(response.statusCode).json(response);
	} catch (error) {
		next(error);
	}
};

const deleteProjectController = async (req, res, next) => {
	try {
		const response = await deleteProjectByIdQuery(req.query.project_id);
		return res.status(response.statusCode).json(response);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createProjectController,
	getProjectController,
	editProjectController,
	deleteProjectController,
};
