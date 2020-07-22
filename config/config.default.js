'use strict';

/**
 * egg-jenkins default config
 * @member Config#jenkins
 * @property {String} SOME_KEY - some description
 */
exports.jenkins = {
  client: {},
  default: {
    crumbIssuer: false,
    promisify: true,
  },
  app: true,
  agent: false,
};
