const gamelogController = require("../controllers/gamelogController");

module.exports = (app) => {
  app.post('/api/create/game', gamelogController.createGame);
  app.get('/api/read/game', gamelogController.getOneGame);
  app.get('/api/read/game/all', gamelogController.getAllGames);
  app.put('/api/update/game', gamelogController.updateGame);
  app.delete('/api/delete/game', gamelogController.deleteGame);
}