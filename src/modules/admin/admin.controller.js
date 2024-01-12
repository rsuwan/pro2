import admin from "../../../db/modle/admin.modle.js";
import communities from "../../../db/modle/community.modle.js";
import log from "../../../db/log.js";
export const community = async (req, res) => {
  communities
    .find({}, {})
    .then((communitiesD) => {
      return res.send(communitiesD);
    })
    .catch((err) => {
      console.error(err);
    });
};
export const addAdmin = async (req, res) => {
  const { first_name, last_name, email, password, adminAt, degree, bithday, address } = req.body;
  console.log( { first_name, last_name, email, password, adminAt, degree, bithday, address });
  const findAdmin = await log.findOne({ "email": email }, { "_id": 1 })
  if (findAdmin) {
      return res.status(401).send({ msg: 'this admin is already exists' });
  } else {
      const newAdmin = await admin.create({
          "email": email,
          "first_name": first_name,
          "last_name": last_name,
          "address": address,
          "community_id": adminAt,
          "birth_date": bithday,
      });
      newAdmin.save();
      console.log("sss");
      const newAdminLog = await log.create({
          "email": email,
          "role": degree,
          "password": password,
      });
      console.log("ddd");
      newAdminLog.save();
      return res.send({ msg: 'admin created' });
  }
}

export const deleteAdmin = async (req, res) => {
  const { emailA } = req.body;
  communities
    .deleteOne({ email: emailA })
    .then((deleteOperation) => {
      log.deleteOne({ email: emailA }).then((deleteP) => {
        return res.send(deleteP);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const viewAdmin = async (req, res) => {
  admin
    .find({}, {})
    .then((adminD) => {
      return res.send(adminD);
    })
    .catch(() => {
      res.send("can not view the admins list");
    });
};
export const disableAccount = async (req, res) => {
  const { email } = req.body;
  log
    .updateOne({ email: email }, { status: false })
    .then((eresult) => {
      return res.send("This account is disabled");
    })
    .catch((err) => {
      res.send("cannot disable this account");
    });
};

export const enableAccount = async (req, res) => {
  const { email } = req.body;
  log
    .findOneAndUpdate({ email: email }, { status: true })
    .then((eresult) => {
      return res.send("This account is enabled.");
    })
    .catch((err) => {
      res.send("cannot enable this account");
    });
};

export const recoverPassword = async (req, res) => {
  const { email, password } = req.body;
  log
    .findOneAndUpdate({ email: email }, { password: password })
    .then((eresult) => {
      return res.send("password is updated");
    })
    .catch((err) => {
      return res.send("cannot update password");
    });
};
