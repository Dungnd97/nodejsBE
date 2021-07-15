import express from 'express';
import homeController from '../controllers/homeController';
import loginController from '../controllers/loginController';
let router = express.Router();

let initWebRoutes = (app) => {
    // router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);

    router.get('/getUser', homeController.getUser);
    router.get('/addUser', homeController.addUser);
    router.post('/postUser', homeController.postUser);
    router.get('/formEditUser', homeController.getUserById);
    router.post('/putUser', homeController.putUser);
    router.get('/deleteUser', homeController.deleteUser);

    return app.use("/api/login", loginController.handleLogin);
};

module.exports = initWebRoutes;