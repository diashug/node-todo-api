const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // configure mongoose to use promises
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose: mongoose
};
