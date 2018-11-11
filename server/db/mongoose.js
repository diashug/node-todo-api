const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configure mongoose to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};
