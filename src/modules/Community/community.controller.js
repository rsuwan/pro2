const express = require('express');
const multer = require('multer');
const admin = require('../DataBase/schema/admin');
const community = require('../DataBase/schema/community');
const communityproperties = require('../DataBase/schema/community_properities');
const router = express.Router();
var id = null;

router.post("/createCommunity", async (req, res) => {
    // http://localhost:3000/community/createCommunity
    // {
    //     "communityName": "phones",
    //     "communityDescription": "for any phone you want"
    // }
    const { communityName, communityDescription } = req.body;
    const communityNameDB = await community.findOne({ community_name: communityName });
    if (communityNameDB) {
        res.status(401).send({ msg: 'This community already exists' });
    } else {
        const newCommunity = await community.create({
            community_name: communityName,
            description: communityDescription,
        });
        newCommunity.save();
        const { _id } = await community.findOne({
            "community_name": communityName
        }, {
            "_id": 1
        });
        res.send("Community created successfully");
    }
});

router.post("/addProperty", async (req, res) => {
    // http://localhost:3000/community/addProperty
    // {
    //     "communityD": "phones" ,
    //     "propertyD": "12345",
    //     "valueD": "String",
    //     "ownerFillD": true,
    //     "customerFillD": false
    // }
    const { communityD, propertyD, valueD, ownerFillD, customerFillD } = req.body;
    const propertyDB = await communityproperties.findOne({ property: propertyD });
    if (propertyDB) {
        res.status(401).send({ msg: 'This this property already exists' });
    } else {

        const newProperty = await communityproperties.create({
            community_Name: communityD,
            property: propertyD,
            value: valueD,
            owner_fill: ownerFillD,
            customer_fill: customerFillD,
        });
        console.log("ll");
        newProperty.save();

        console.log({ propertyD, valueD, ownerFillD, customerFillD });
        res.send("Community created successfully");
    }
});
router.post("/viewProperty", async (req, res) => {
    // http://localhost:3000/community/viewProperty
    // {
    //     "communityD": "phones"
    // }
    const { communityD } = req.body;
    communityproperties.find({ community_Name: communityD },
        { _id: 0, __v: 0 })
        .then(propertiesD => {
            res.send(propertiesD);
        })
        .catch(err => {
            res.send("something error");
        });
});
router.post("/removeProperty", async (req, res) => {
    // http://localhost:3000/community/removeProperty
    // {
    //     "communityD": "phones",
    //     "propertyD": "123"
    // }
    const { communityD, propertyD } = req.body;

    communityproperties.deleteOne({ "community_Name": communityD ,  "property": propertyD })
        .then(result => {
            return res.json(result)
        }
        )
        .catch(err => {
            console.error(err);
            return res.json("something error here!")

        });
});
module.exports = router;
