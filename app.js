'use strict';

const jenkins = require('./lib/jenkins');

module.exports = app => {
  if (app.config.jenkins.app) jenkins(app);
};
