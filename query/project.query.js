const { uploadFile } = require("../helper/upload.helper");
const projectModel = require("../models/project.model");

const createProjectQuery = async (details, images) => {
	try {
		const {
			project_name,
			sub_heading,
			area,
			length,
			width,
			city,
			posted_on,
			status,
			configuration,
			full_address,
			number_of_floores,
			facing,
			overlooking,
			posess_in,
			iframe_url,
			places_nearby,
			about_propoerty,
		} = details;

		// console.log(images.images);

		let uploadUrls = [];
		if (images.images.length > 0) {
			for (let i = 0; i < images.images.length; i++) {
				// let url = await uploadFile(images.images[i].data);
				uploadUrls.push({
					data: images.images[i].data,
					mimeType: images.images[i].mimetype,
				});
			}
			// console.log("upload urls", uploadUrls);
		} else if (images.images) {
			//for single image upload
			uploadUrls.push({
				data: images.images.data,
				mimeType: images.images.mimeType,
			});
		}

		const newProject = await projectModel.create({
			project_name: project_name,
			sub_heading: sub_heading,
			area: area,
			length: length,
			width: width,
			city: city,
			posted_on: posted_on,
			status: status,
			configuration: configuration,
			full_address: full_address,
			number_of_floores: number_of_floores,
			facing: facing,
			overlooking: overlooking,
			posess_in: posess_in,
			iframe_url: iframe_url,
			places_nearby: places_nearby,
			about_propoerty: about_propoerty,
			images: uploadUrls,
		});

		if (newProject) {
			return Promise.resolve({
				status: true,
				statusCode: 201,
				message: "Success! New Project Details Created",
			});
		} else {
			return Promise.resolve({
				status: true,
				statusCode: 500,
				message: "Oops! can not create new project right now",
			});
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

// Helper function to process images
const processImages = (images) => {
	let uploadUrls = [];

	if (Array.isArray(images.images) && images.images.length > 0) {
		uploadUrls = images.images.map((image) => ({
			data: image.data,
			mimeType: image.mimetype,
		}));
	} else if (images.images) {
		// Single image upload
		uploadUrls.push({
			data: images.images.data,
			mimeType: images.images.mimeType,
		});
	}

	return uploadUrls;
};
const getProjectQuery = async () => {
	try {
		let projectList = await projectModel.find();
		if (projectList) {
			return Promise.resolve({
				status: true,
				statusCode: 200,
				// data: projectList,
				data: projectList.map((project) => ({
					...project.toObject(),
					images: project.images.map((image) => ({
						data: image.data.toString("base64"), // Convert each image buffer to base64
						mimeType: image.mimeType, // Access mimetype at the image level
					})),
				})),
			});
		} else {
			return Promise.resolve({
				status: false,
				statusCode: 500,
				message: "Error while getting project list",
			});
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

const editProjectQuery = async (id, details, images) => {
	// console.log("images:::::    ", images);
	let uploadUrls = [];
	if (images) {
		// console.log("Inside");
		if (images.images.length > 0) {
			for (let i = 0; i < images.images.length; i++) {
				// let url = await uploadFile(images.images[i].data);
				uploadUrls.push({
					data: images.images[i].data,
					mimeType: images.images[i].mimetype,
				});
			}
			// console.log("upload urls", uploadUrls);
		} else if (images.images) {
			//for single image upload
			uploadUrls.push({
				data: images.images.data,
				mimeType: images.images.mimeType,
			});
		}
	}
	try {
		// console.log(id, details);
		const existingProject = await projectModel.findById(id);
		if (!existingProject) {
			return Promise.reject({
				status: false,
				statusCode: 404,
				message: "Project not found",
			});
		}
		// console.log(id, details)
		// Remove undefined fields to update only the ones provided
		const updateFields = {};
		for (const key in details) {
			if (key == "images") {
				continue;
			}
			if (details[key] !== undefined) {
				updateFields[key] = details[key];
			}
		}
		// console.log("details", details);
		if (images) {
			updateFields.images = uploadUrls;
		}
		console.log("update fields:::::  ", updateFields);
		const updatedProject = await projectModel.findOneAndUpdate(
			{ _id: id }, // Assuming MongoDB, adjust key if using a different database
			{ $set: updateFields }
		);
		// console.log(updatedProject);
		if (updatedProject != null) {
			return Promise.resolve({
				status: true,
				statusCode: 200,
				message: "Success! Project Details Updated",
			});
		} else {
			return Promise.resolve({
				status: true,
				statusCode: 304,
				message: "No changes were made to the project details",
			});
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

const deleteProjectByIdQuery = async (project_id) => {
	try {
		// Check if the project exists
		const existingProject = await projectModel.findById(project_id);
		if (!existingProject) {
			return Promise.reject({
				status: false,
				statusCode: 404,
				message: "Project not found",
			});
		}

		// Delete the project
		const deletedProject = await projectModel.deleteOne({ _id: project_id });

		if (deletedProject.deletedCount > 0) {
			return Promise.resolve({
				status: true,
				statusCode: 200,
				message: "Success! Project Deleted",
			});
		} else {
			return Promise.resolve({
				status: false,
				statusCode: 500,
				message: "Failed to delete project",
			});
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

module.exports = {
	createProjectQuery,
	getProjectQuery,
	editProjectQuery,
	deleteProjectByIdQuery,
};
