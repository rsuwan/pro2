import community from "../../../db/modle/community.modle.js";
import communityproperties from "../../../db/modle/communityProperties.modle.js";
export const viewCommunities = async (req, res) => {
  community.find({},
    { community_name: 1, description: 1, _id: 0 })
    .then((communityD) => {
      res.send(communityD);
    })
    .catch((err) => {
      res.send("something error");
    });
};

export const createCommunity = async (req, res) => {
  const { communityName, communityDescription } = req.body;
  const communityNameDB = await community.findOne({
    community_name: communityName,
  });
  if (communityNameDB) {
    return res.status(401).send({ msg: "This community already exists" });
  } else {
    const newCommunity = await community.create({
      community_name: communityName,
      description: communityDescription,
    });
    newCommunity.save();
    return res.send("Community created successfully");
  }
};

export const addProperty = async (req, res) => {
  const { propertyD, ownerFillD, customerFillD, valueD } = req.body;
  const latestCommunity = await community.findOne({}, { community_name: 1, created_date: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .exec();
  console.log(latestCommunity);
  console.log(latestCommunity.community_name);
  const propertyDB = await communityproperties.findOne({ $and: [{ property: propertyD }, { community_Name: latestCommunity }] })
  if (propertyDB) {
    res.status(401).send({ msg: "This this property already exists" });
  } else {
    const newProperty = await communityproperties.create({
      community_Name: latestCommunity.community_name,
      property: propertyD,
      value: valueD,
      owner_fill: ownerFillD,
      customer_fill: customerFillD,
    });
    newProperty.save();
    console.log({ propertyD, valueD, ownerFillD, customerFillD });
    res.send("added successfuly");
  }
};

export const viewProperty = async (req, res) => {
  const { communityName } = req.body;
  communityproperties
    .find({ community_Name: communityName }, { __v: 0 })
    .then((propertiesD) => {
      res.send(propertiesD);
    })
    .catch((err) => {
      res.send("something error");
    });
};

export const removeProperty = async (req, res) => {
  const { communityName, propertyD } = req.body;
  communityproperties
    .deleteOne({ community_Name: communityName, property: propertyD })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.json("something error here!");
    });
};

export const cancleCreation = async (req, res) => {
  const { communityName } = req.body;
  communityproperties.deleteMany({ community_Name: communityName })
    .then((result) => {
    })
    .catch((err) => {
      console.error(err);
      return res.json("something error here!");
    });
  community
    .deleteOne({ community_name: communityName })
    .then((result) => {
      return res.json({ msg: "deleting done" });
    }).catch((err) => {
      console.error(err);
      return res.json("something error here!");
    });
};