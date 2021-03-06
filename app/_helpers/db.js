const config = require('../../config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Activity: require('../activities/activity.model'),
    Client: require('../clients/client.model')
};
