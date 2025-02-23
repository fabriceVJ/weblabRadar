import express from "express";
import authMiddleware from "./authInterceptor.js";
import Technology from "./models/technology.js";
import User from "./models/user.js";

const router = express.Router();

// authentication middleware
// TODO add middleware back in
router.use(authMiddleware);


router.route('/technologies')
    .get(getTechnologies)
    .post(addTechnology)
router.route('/technologies/:id')
    .put(updateTechnology)
    .delete(deleteTechnology);


async function getTechnologies(req, res) {
    let results;
    const user = await User.findOne({username: req.user.username});
    if (user.role === "admin") {
        results = await Technology.find();
    } else {
        results = await Technology.find({publishDate: {"$nin": ['', null, undefined]}})
        console.log(typeof(results[1].publishDate));
    }
    res.json(results).status(200);
}
function updateTechnology(req, res) {
    console.log("updateTechnology");
}
function deleteTechnology(req, res) {
    console.log("deleteTechnology");
}
async function addTechnology(req, res) {
    console.log(req.body);
    const {name, category, ring, descriptionTechnology, descriptionOnRing, publishDate} = req.body;
    if (!name || !category || !ring || !descriptionTechnology || !descriptionOnRing) {
        res.status(400).send("Invalid input")
    }
    try {
        let tech;
        if (publishDate) {
            tech = new Technology({name, category, ring, descriptionTechnology, descriptionOnRing, publishDate});

        } else {
            tech = new Technology({name, category, ring, descriptionTechnology, descriptionOnRing});
        }
        await tech.save();
        res.status(200).send();
    } catch (err) {
        res.status(500).send("Error occurred while saving technology." + err.message);
    }

}

export default router;