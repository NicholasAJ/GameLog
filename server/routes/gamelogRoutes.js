const gamelogController = require("../controllers/gamelogController");

module.exports = (app) => {
  app.post('/api/create/log', gamelogController.createLog);
  app.put('/api/update/log', gamelogController.updateLog);
  app.get('/api/read', gamelogController.getOneLog);
  app.get('/api/read/all', gamelogController.getAllLogs);
  app.delete('/api/delete/log', gamelogController.deleteLog);
}