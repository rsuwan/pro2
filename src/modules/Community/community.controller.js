import community from "../../../db/modle/community.modle.js";
import communityproperties from "../../../db/modle/CommunityProperties.modle.js";

export const createCommunity = async (req, res) => {
    // http://localhost:3000/community/createCommunity
    // {
    //     "communityName": "phones",
    //     "communityDescription": "for any phone you want"
    // }
    const { communityName, communityDescription } = req.body;
    console.log("fff");
    const communityNameDB = await community.findOne({ community_name: communityName });
    if (communityNameDB) {
        return res.status(401).send({ msg: 'This community already exists' });
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
        return res.send("Community created successfully");
    }
};

export const addProperty = async (req, res) => {
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
};
export const viewProperty = async (req, res) => {
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
};

export const removeProperty = async (req, res) => {
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
};
