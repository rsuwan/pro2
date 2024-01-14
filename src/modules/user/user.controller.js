import user from '../../../db/modle/User.modle.js'
import log from '../../../db/log.js'

export const addUser = async (req, res) => {
    const { firstName, lastName, email, password, birthday, address } = req.body;
    if (firstName != undefined && lastName != undefined && email != undefined && password != undefined && birthday != undefined && address != undefined) {
        const userExists = await log.findOne({email});
        if (userExists) {
            return res.status(401).send({ msg: 'this user already exists' });
        } else {
            const newUser = await user.create({
                email, firstName, lastName, address, birth_date: birthday, confirmEmail: true
            });
            newUser.save();
            const newUserLog = await log.create({
                email, role: 'user', password
            });
            newUserLog.save();
            return res.status(201).send({ msg: 'user created' });
        }
    } else {
        return res.status(401).send({ msg: 'unfilled fields' });
    }
};

export const deleteUser = async (req, res) => {
    const { email } = req.body;
    if (email != undefined) {
        log.findOne({ email: email })
            .then(() => {
                user.deleteOne({ email: email })
                    .then(() => {
                        log.deleteOne({ email: email })
                            .then(() => {
                                return res.status(200).send({ msg: "delete this account successfully" })
                            })
                            .catch(() => {
                                return res.status(404).send({ msg: "can not delete this account from log collection" })
                            });
                    })
                    .catch(() => {
                        return res.status(404).send({ msg: "can not delete this account from user collection" })
                    });
            })
    } else {
        return res.status(404).send({ msg: "this account is invalid" });
    }
};

export const viewUser = async (req, res) => {
    user.find({}, {})
        .then(user => {
            return res.status(200).send(user);
        })
        .catch(() => {
            return res.status(404).send({ msg: "can not view the users list" })
        });
};

export const disableUser = async (req, res) => {
    const  {email}  = req.body;
    if (email) {
      log.findOneAndUpdate({ email, state_us: false })
        .then(() => {
          return res.status(200).send({ msg: "admin account is disabled" });
        }).catch(() => {
          return res.status(304).send({ msg: "cannot disable this account" })
        })
    } else {
      return res.status(404).send({ msg: "this account is invalid" });
    }
  };
  
  export const enableUser = async (req, res) => {
    const {email} = req.body;
    if (email) {
      log.findOneAndUpdate({ email, state_us: true })
        .then(() => {
          return res.status(200).send({ msg: "admin account is enabled" });
        }).catch(() => {
          return res.status(304).send({ msg: "cannot enable  this account" })
        })
    } else {
      return res.status(404).send({ msg: "this account is invalid" });
    }
  };
  

export const recoverPassword = async (req, res) => {
    const { email, password } = req.body;
    if (email != undefined) {
        log.findOne({ email: email })
            .then(() => {
                log.updateOne({ email: email }, { password: password })
                    .then(() => {
                        return res.status(200).send({ msg: "password is updated" });
                    })
                    .catch(() => {
                        return res.status(304).send({ msg: "cannot update password" });
                    });
            })
            .catch(() => {
                return res.status(500).send({ msg: "cannot find this account" });
            });
    } else {
        return res.status(404).send({ msg: "this account is invalid" });
    }
};