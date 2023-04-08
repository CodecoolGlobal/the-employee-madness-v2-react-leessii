const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

router.get("/:search", async (req, res) => {
    const employee = await EmployeeModel.find({ name: { $regex : req.params.search.toString(), "$options": "i" } });
    return res.json(employee);
});

module.exports = router;