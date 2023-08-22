const mongoose = require("mongoose")

const GameLogSchema = new mongoose.Schema({

  GameName:{
    type: String,
    required: [true, "Need a game name"],
    minlength: [1, "Game name needs to be at least one character"]
  },
  Genre:{
    type: String,
    required: [true, "Enter a game genre"]
  },
  DateCreated:{
    type: Number,
    required: [true, "Enter a year"]
  },
  Version:{
    type: String,
    required: [true, "need a game version"]
  },
  Console:{
    type: String,
    required: [true, "what console is the game on"]
  },
},  {timestamps:true})

const Game = mongoose.model("Game", GameLogSchema);

module.exports = Game;