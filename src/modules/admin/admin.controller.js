import admin from "../../../db/modle/admin.modle.js";
import communities from "../../../db/modle/community.modle.js";
import log from "../../../db/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const community = async (req, res) => {
  communities
    .find({}, {})
    .then((communitiesD) => {
      return res.status(200).send(communitiesD);
    })
    .catch(() => {
      return res.status(404).send({ msg: "con not find communities" });
    });
};
export const addAdmin = async (req, res) => {
  const { first_name, last_name, email, password, adminAt, degree, bithday, address } = req.body;
  //console.log({ first_name, last_name, email, password, adminAt, degree, bithday, address });
  const findAdmin = await log.findOne({ "email": email })
  //console.log(findAdmin);
  
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  if (findAdmin) {
    return res.status(401).send({ msg: 'this admin is already exists' });
  }
 else {
    const newAdmin = await admin.create({
      "email": email,
      "first_name": first_name,
      "last_name": last_name,
      "address": address,
      "community_id": adminAt,
      "birth_date": bithday,
    });
    newAdmin.save();
    const newAdminLog = await log.create({
      "email": email,
      "role": degree,
      "password": hashedPassword,

    });
    newAdminLog.save();
    return res.status(201).send({ msg: 'admin created' });
  }
}
export const deleteAdmin = async (req, res) => {
  const { email } = req.body;
  if (email != undefined) {
    log
      .findOne({ email: email })
      .then(() => {
        admin
          .deleteOne({ email: email })
          .then(() => {
            log
              .deleteOne({ email: email })
              .then(() => {
                return res
                  .status(200)
                  .send({ msg: "delete this account successfully" });
              })
              .catch(() => {
                return res.status(404).send({
                  msg: "can not delete this account from log collection",
                });
              });
          })
          .catch(() => {
            return res.status(404).send({
              msg: "can not delete this account from user collection",
            });
          });
      })
      .catch(() => {
        return res.status(404).send({ msg: "this account is invalid" });
      });
  } else {
    return res.status(404).send({ msg: "this account is invalid" });
  }
};

export const viewAdmin = async (req, res) => {
  admin
    .find({}, {})
    .then((adminD) => {
      return res.status(200).send(adminD);
    })
    .catch(() => {
      return res.status(404).send({ msg: "can not view the admins list" });
    });
};
export const viewCommunityAdmin = async (req, res) => {
  const { email } = req.body;
  if (email != undefined) {
    admin.findOne({ email }, { community_id: 1, _id: 0 }).then((community) => {
      console.log(community);
      admin
        .find({ community_id: community.community_id }, {})
        .then((admins) => {
          console.log({ admins });
          return res.send(admins);
        })
        .catch(() => {
          return res.status(200).send({ msg: "cannot view the admins list" });
        });
    });
  } else {
    return res.status(404).send({ msg: "this account is invalid" });
  }
};
export const disableAdmin = async (req, res) => {
  const { email } = req.body;
  if (email) {
    log
      .findOneAndUpdate({ email, state_us: false })
      .then(() => {
        return res.status(200).send({ msg: "admin account is disabled" });
      })
      .catch(() => {
        return res.status(304).send({ msg: "cannot disable this account" });
      });
  } else {
    return res.status(404).send({ msg: "this account is invalid" });
  }
};

export const enableAdmin = async (req, res) => {
  const { email } = req.body;
  if (email) {
    log
      .findOneAndUpdate({ email, state_us: true })
      .then(() => {
        return res.status(200).send({ msg: "admin account is enabled" });
      })
      .catch(() => {
        return res.status(304).send({ msg: "cannot enable  this account" });
      });
  } else {
    return res.status(404).send({ msg: "this account is invalid" });
  }
};

export const recoverPassword = async (req, res) => {
  const { email, password } = req.body;
  if (email != undefined) {
    log
      .findOne({ email: email })
      .then(() => {
        log
          .updateOne({ email: email }, { password: password })
          .then(() => {
            return res.status(200).send({ msg: "password is updated" });
          })
          .catch(() => {
            return res.status(500).send({ msg: "cannot update password" });
          });
      })
      .catch(() => {
        return res.status(500).send({ msg: "cannot find this account" });
      });
  } else {
    return res.status(404).send({ msg: "this account is invalid" });
  }
};