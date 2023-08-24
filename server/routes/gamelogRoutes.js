const gamelogController = require("../controllers/gamelogController");

module.exports = (app) => {
  app.post('/api/game/create', gamelogController.createGame);
  app.get('/api/game/read/:id', gamelogController.getOneGame);
  app.get('/api/game/all', gamelogController.getAllGames);
  app.patch('/api/game/update/:id', gamelogController.updateGame);
  app.delete('/api/game/delete/:id', gamelogController.deleteGame);
}