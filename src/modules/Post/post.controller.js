import communityProperities from '../../../db/modle/communityProperties.modle.js'
import communities from '../../../db/modle/community.modle.js'
import post from '../../../db/modle/post.modle.js'
export const postView = async (req, res) => {
    try {
        const communityParams = req.params;
        const communityName = communityParams.community; // This should be a string
        const found = await communities.findOne({ community_name: communityName });
        console.log('Found community:', found);
        if (!found) {
            console.log('Community not found:', communityName);
            return res.status(404).send({ msg: 'Community not found' });
        }
        const properties = await communityProperities.find({ community_Name: communityName },
            { _id: 0, __v: 0 });
        console.log(properties);
        if (!properties) {
            return res.status(404).send({ msg: 'No found community' });
        }
        if (properties.length === 0) {
            return res.status(404).send({ msg: 'No properties found for community' });
        }
        return res.status(200).send( properties);

    } catch (err) {
        res.status(500).send({ msg: 'Error retrieving properties' });
    }
};

export const createPost = async (req, res) => {
    try {
        const communityParams = req.params;
        const communityName = communityParams.community; // This should be a string
        const found = await communities.findOne({ community_name: communityName });
        console.log(found);
        if (!found) {
            console.log('Community not found:', communityName);
            return res.status(404).send({ msg: 'Community not found' });
        }
        const input = req.body;
        
        console.log(input);
        const newPost = new post({
            community_name: communityName,
            like: 0,
            properties: input,
        });
        newPost.save();
        return res.status(201).send({ msg: "created successfuly:)" })
    } catch (err) {
        return res.status(500).send({ msg: 'Error retrieving properties' });
    }
};

export const viewPost = async (req, res) => {
    try {
        const communityParams = req.params;
        const communityName = communityParams.community;
        const found = await communities.findOne({ community_name: communityName });
        console.log(found);
        if (!found) {
            console.log('Community not found:', communityName);
            return res.status(404).send({ msg: 'Community not found' });
        }
        try {
            const posts = await post.find({ community_name: communityName }, {});
            if (!posts || posts.length === 0) {
                console.log('No posts found for community:', communityName);
                return res.status(404).send('No posts found for community');
            }
            console.log('Posts found for community:', communityName, posts);
            return res.status(201).send( posts );
        } catch (err) {
            console.error('Error retrieving posts:', err);
            return res.status(500).send('Error retrieving posts');
        }
    } catch (err) {
        return res.status(500).send({ msg: 'Error retrieving properties' });
    }
};