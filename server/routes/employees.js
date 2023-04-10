const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

router.get("/", async (req, res) => {
    const { option, input, arragement, pageNumber, isAsc } = req.query;
    query={};
    sort={};
    // which page we are on
    const page = parseInt(pageNumber);
    // how many to display
    const pageSize = parseInt(10);
    // get total number of employes
    const total = await EmployeeModel.countDocuments({});

    // filter
    if (option === "level") {
        query.level = { $regex: `${input}`, $options: "i" };
    }

    if (option === "position") {
        query.position = { $regex: `${input}`, $options: "i" };
    }

    // sort 
    if (arragement === "level") {
        sort.level = 1;
    }

    if (arragement === "position") {
        sort.position = 1;
    }

    if (arragement === "name") {
        sort.name = 1;
    }

    if (isAsc.toString() === "asc") {
        sort.name = 1;
    } 

    if (isAsc.toString() === "des") {
        sort.name = -1;
    }

    const employees = await EmployeeModel.find(query).populate('brand').sort(sort).limit(pageSize).skip(pageSize*page);
    return res.json({
        totalPages: Math.ceil(total / pageSize),
        employees
    });
});
  
router.get("/:id", async (req, res) => {
    const employee = await EmployeeModel.findById(req.params.id);
    return res.json(employee);
});
  
router.post("/", async (req, res, next) => {
    const employee = req.body;


    try {
        const saved = await EmployeeModel.create(employee);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});
  
router.patch("/:id", async (req, res, next) => {
    try {
        const employee = await EmployeeModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
        );
        return res.json(employee);
    } catch (err) {
        return next(err);
    }
});
  
router.delete("/:id", async (req, res, next) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        const deleted = await employee.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;