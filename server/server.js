const express = require('express');
const app = express();

require('./config/mongoose.config');
require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended:true }));

const UserRoutes = require('./routes/userRoutes')
UserRoutes(app);

app.listen(8000, () => console.log("Commander, the server is running on port 8000"));
