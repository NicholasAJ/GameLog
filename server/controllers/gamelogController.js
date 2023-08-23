const Game = require('../models/gameLog.models')

const createGame = (req,res) => {
  Game.create(req.body)
  .then (newGame => {
    console.log(newGame);
    res.json(newGame);
  })
  .catch(err => {
    console.log("error CREATING game serverside", err);
    res.status(400).json(err);
  });
};
const getAllGames = (req,res) => {
  Game.find({})
  .then(allGames => {
    console.log(allGames);
    res.json(allGames);
  })
  .catch( err =>{ 
    console.log("error getting ALL games", err);
    res.status(400).json(err);
  });
};
const getOneGame = (req,res) => {
  Game.findOne({_id:req.params.id})
  .then(oneGame => {
    console.log(oneGame);
    res.json(oneGame);
  })
  .catch(err => {
    console.log('error getting ONE game',err);
    res.json(400).json(err);
  });
};
const updateGame = (req,res) => {
  Game.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
  .then(updatedGame => {
    console.log(updatedGame);
    res.json(updatedGame)
  })
  .catch(err => {
    console.log("error UPDATING game",err);
    res.json(400).json(err)
  })
}
const deleteGame = (req,res) => {
  Game.deleteOne({_id:req.params.id})
  .then(deleteConfirmation => {
    console.log(deleteConfirmation);
    res.json(deleteConfirmation);
  })
  .catch(err => {
    console.log("error DELETING game",err);
    res.json(400).json(err);
  });
};

module.exports = {
  createGame,
  getAllGames,
  getOneGame,
  updateGame,
  deleteGame
}