// community.controller.js
import express from "express";
import Community from "../../../db/modle/community.modle.js"; // Use the default import

const router = express.Router();

router.post("/createCommunity", async (req, res) => {
    const { communityName, communityDescription } = req.body;
    const communityNameDB = await Community.findOne({ community_name: communityName });
    if (communityNameDB) {
        res.status(401).send({ msg: "This community already exists" });
    } else {
        const newCommunity = await Community.create({
            community_name: communityName,
            description: communityDescription,
        });
        newCommunity.save();
        const { _id } = await Community.findOne(
            {
                community_name: communityName,
            },
            {
                _id: 1,
            }
        );
        const id = _id; // Fix the typo here
        res.send("Community created successfully");
    }
});

export default router;
