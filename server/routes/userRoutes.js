const userController = require("../controllers/userController");

module.exports = (app) => {
  app.post('/api/register' ,userController.registerUser)
  app.post('/api/login' ,userController.loginUser)
  app.post('/api/logout' ,userController.logout)
}