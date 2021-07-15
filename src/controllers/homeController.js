
import db from '../models/index';
import userService from '../services/userService';

// let getHomePage = async (req, res) => {
//     try {
//         let data = await db.User.findAll();
//         return res.render("homepage.ejs", {
//             data: JSON.stringify(data),
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// let getAboutPage = (req, res) => {
//     return res.render("homepage.ejs");
// };

let addUser = (req, res) => {
    return res.render("crud.ejs");
}

let postUser = async (req, res) => {
    let data = await userService.createNewUser(req.body);
    return res.render("getUser.ejs", {
        data
    });
    
}

let getUser = async (req, res) => {
    let data = await userService.getAllUser({
        raw: true,
    });
    return res.render("getUser.ejs", {
        data,
    });
}

let getUserById = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let data = await userService.getUserById(userId);
        return res.render("fromEditUser.ejs", {
            data
        });
    }
    else {
        return res.send("Mày không truyền ID thì bố mày tìm niềm tin à");
    }

}

let putUser = async (req, res) => {
    let data= await userService.updateUser(req.body);
    return res.render("getUser.ejs", {
        data
    });
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    if(id){
        let data= await userService.deleteUser(id);
    return res.render("getUser.ejs", {
        data
    });
    }
    else {
        return res.send("Mày không truyền ID thì bố mày xóa bằng niềm tin à")
    }
    
}

module.exports = {
    // getHomePage,
    // getAboutPage,
    addUser,
    postUser,
    getUser,
    getUserById,
    putUser,
    deleteUser,
}