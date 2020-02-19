var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    mlabDB = require('../mongo')


 var config = {
    development: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 5000,
        secret : "getfitfar3344556698765432",
        EvenNodeDB: mlabDB
    },

    test: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 5000,
        secret : "getfitfar3344556698765432",
        EvenNodeDB: mlabDB
    },

    production: {
        root: rootPath,
        app: {
            name: 'mobileServer'
        },
        port: process.env.PORT || 5000,
        secret : "getfitfar3344556698765432",
        EvenNodeDB: mlabDB
    }
};

module.exports = config[env];
