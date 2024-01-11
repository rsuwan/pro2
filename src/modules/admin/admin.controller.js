import admin from '../../../db/modle/admin.modle.js'
import  communities from '../../../db/modle/community.modle.js'
import  log from '../../../db/log.js'
import { Router } from "express";
const router = Router();
router.get('/addAdmin/community', async (req, res) => {
    // http://localhost:3000/addAdmin/community
    communities.find({}, { _id: 0,community_name:1})
        .then(communitiesD => {
            res.send(communitiesD);
            console.log(communitiesD);
        })
        .catch(err => {
            console.error(err);
        });
});

 export const AddAdmin =async (req, res) => {
    // http://localhost:3000/addAdmin
    // {
    //     "first_name": "batool",
    //     "last_name": "saleh",
    //     "email":"basa@gmail.com",
    //     "password":"23456",
    //     "adminAt": "phones",
    //     "degree": "superadmin",
    //     "bithday" : "2024-01-09",
    //     "address": "shofa"
    // }
    const { first_name, last_name, email, password, adminAt, degree, bithday, address } = req.body;
    const findAdmin = await admin.findOne({ "email": email }, { "_id": 1 })
    if (findAdmin) {
        return res.status(401).send({ msg: 'this admin is already exists' });
    } else {

        const { _id } = await communities.findOne({
            "community_name": adminAt
        }, {
            "_id": 1
        });
        const newAdmin = await admin.create({
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "address": address,
            "community_id": _id,
            "birth_date": bithday,
        });
        newAdmin.save();
        const newAdminLog = await log.create({
            "email": email,
            "role": degree,
            "password": password,
        });
        newAdminLog.save();
        return res.send({ msg: 'admin created' });
    }
}

