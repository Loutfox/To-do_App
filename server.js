const express = require("express");
const mongoose = require("mongoose");

// Item Routes
const itemRoutes = require("./api/itemRoutes");

// User Routes
const userRoutes = require("./api/userRoutes"); 

// Environmental PORT in case of deployment on heroku for instance, otherwise we're using the PORT number 5000
const PORT = process.env.PORT || 5000;

const app = express();


// Built-in bodyparser middleware
app.use(express.json());

// DB Config
const db = require("./config/keys");

// DB Connection
mongoose.connect(db.mongoURI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
})
.catch(err => console.log(err));

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);








