import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });

            if (user) resolve(user);
            else resolve([]);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(user.password);
            await db.User.create({
                email: user.email,
                password: hashUserPasswordFromBcrypt,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender == 1 ? true : false,
                roleId: user.roleId,
            });
            let users = await db.User.findAll();
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });

            if (user) {
                user.email = data.email;
                user.password = await hashUserPassword(data.password);
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender === 1 ? true : false;
                user.roleId = data.roleId;

                await user.save();

                let users = await db.User.findAll();
                resolve(users);
            }
            else {
                resolve('No success');
            }
        } catch (error) {
            reject(error);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
}

let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
                let users = await db.User.findAll();
                resolve(users);
            }
            else {
                resolve("No success");
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createNewUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
}