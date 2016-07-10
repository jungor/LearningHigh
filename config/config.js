var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'learninghigh',
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root:admin123@qykj.com/qykj',
  },

  test: {
    root: rootPath,
    app: {
      name: 'learninghigh',
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/learninghigh-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'learninghigh',
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/learninghigh-production',
  },
};

module.exports = config[env];
