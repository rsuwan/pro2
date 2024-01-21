import user from '../../../db/modle/User.modle.js'
import log from '../../../db/log.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const addUser = async (req, res) => {
    const { firstName, lastName, email, password, birthday, address } = req.body;
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );
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
                email, role: 'User', password:hashedPassword
            });
            newUserLog.save();
            return res.status(201).send({ msg: 'user created' });
        }
    } else {
        return res.status(401).send({ msg: 'unfilled fields' });
    }
};
export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
      const deletedUser = await log.destroy({
        where: { id: userId }
      });
    
      if (deletedUser) {
        return res.status(200).json({ message: "User deleted successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    
    
};
export const deleteuser = async (req, res) => {
    const { email } = req.body;
    
    if (email !== undefined) {
      try {
        const userRecord = await log.findOne({ email });
  
        if (!userRecord) {
          return res.status(404).send({ msg: "Account not found" });
        }
  
        await user.deleteOne({ email });
        await log.deleteOne({ email });
  
        return res.status(200).send({ msg: "Account deleted successfully" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ msg: "Internal Server Error" });
      }
    } else {
      return res.status(400).send({ msg: "Invalid account" });
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
      log.findOneAndUpdate({ email},{state_us: false} )
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
      log.findOneAndUpdate({ email},{state_us: true} )
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
     const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );
    if (email != undefined) {
        log.findOne({ email: email })
            .then(() => {
                log.updateOne({ email: email }, { password: hashedPassword })
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