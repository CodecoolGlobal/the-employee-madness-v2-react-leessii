const express = require("express");
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");

router.get("/", async (req, res) => {
    const equipment = await EquipmentModel.find({}).sort( { name: 1 } );
    return res.json(equipment);
});

router.post("/", async (req, res, next) => {
    const equiment = req.body;

    try {
        const saved = await EquipmentModel.create(equiment);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const equipment = await EquipmentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
        );
        return res.json(equipment);
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const equipment = await EquipmentModel.findById(req.params.id);
        const deleted = await equipment.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;