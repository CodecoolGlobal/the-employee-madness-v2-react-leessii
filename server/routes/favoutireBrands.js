const express = require("express");
const router = express.Router();
const FavouriteBrandModel = require("../db/favoriteBrand.model");

router.get("/", async (req, res) => {
    const favouriteBrand = await FavouriteBrandModel.find({}).sort( { name: 1 } );
    return res.json(favouriteBrand);
});


module.exports = router;