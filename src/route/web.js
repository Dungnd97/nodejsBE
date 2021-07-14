import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/addUser', homeController.addUser);
    router.post('/postUser', homeController.postUser);

    return app.use("/", router);
};

module.exports = initWebRoutes;