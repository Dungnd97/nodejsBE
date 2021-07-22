import bcrypt from 'bcryptjs';
import db from '../models/index';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                    // attributes: ['email', 'roleID'],
                });
                if (user) {
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        data.errCode = 0;
                        data.message = `Đăng nhập thành công`;
                        
                        delete user.password;
                        data.infoUser = user;
                    }
                    else {
                        data.errCode = -1;
                        data.message = `Mật khẩu không chính xác. Vui lòng nhập Mật khẩu khác!`;
                    }
                }
                else {
                    data.errCode = -1;
                    data.message = `Email của bạn không tồn tại trong hệ thống. Vui lòng nhập Email khác!`;
                }
            }
            else {
                data.errCode = -1;
                data.message = `Email của bạn không tồn tại trong hệ thống. Vui lòng nhập Email khác!`;
            }

            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin,
}