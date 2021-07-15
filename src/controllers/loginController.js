import loginService from '../services/loginService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Email và mật khẩu không được bỏ trống',
        })
    }

    let data = await loginService.handleUserLogin(email,password);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        infoUser: data.infoUser,
    })
}

module.exports = {
    handleLogin,
}