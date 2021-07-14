
import db from '../models/index';
import userService from '../services/userService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = (req, res) => {
    return res.render("homepage.ejs");
};

let addUser = (req, res) => {
    return res.render("crud.ejs");
}

let postUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.send(message);
}

module.exports = {
    getHomePage,
    getAboutPage,
    addUser,
    postUser,
}