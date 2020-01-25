const user_controller = require('../controllers/user.controller')
const getLoggedUser = require('../../functions/getLoggedUser')

module.exports = (app, redisClient = null, nextApp = null, daftar_client_socketIO = null) => {
    app.post("/login", (req, res) => {
        user_controller.SUBMIT_LOGIN(req, res, null, redisClient);
    })

    app.get("/logout", (req, res) => {
        user_controller.LOGOUT(req, res, nextApp, redisClient);
    });
}