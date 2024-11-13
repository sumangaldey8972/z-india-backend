const express = require("express");
const {
	createProjectController,
	getProjectController,
	editProjectController,
	deleteProjectController,
} = require("../controller/project.controller");
const { projectError } = require("../error/project.error");
const router = express.Router();

router.post("/", createProjectController);
router.get("/", getProjectController);
router.put("/edit", editProjectController);
router.delete("/delete", deleteProjectController);

router.use(projectError);

module.exports = router;
