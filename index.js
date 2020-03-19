const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');
const poleRoutes = require('./api/routes/pole');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://user:pass@cluster0-rhzye.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const port = 80;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/images',express.static('images'));
app.use('/',dataRoutes);
app.use('/poles',poleRoutes)
// app.use('/user', userRoutes);

app.listen(port, (req, res, next) =>{
    console.log(`The app is starting at the port $port`);
})
