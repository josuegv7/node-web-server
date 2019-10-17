// Connection to DB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:adminpassword123@ds335668.mlab.com:35668/node-web-server', {useNewUrlParser: true});


module.exports = {mongoose};
