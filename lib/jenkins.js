'use strict';

const assert = require('assert');
const Jenkins = require('jenkins');

module.exports = app => {
  app.addSingleton('jenkins', createOneClient);
};

function createOneClient(config, app) {
  assert(
    config.host && config.user && config.password,
    `[egg-jenkins] 'host: ${config.host}', 'user: ${config.user}', 'password: ${config.password}' are required on config`
  );

  const baseUrl = `http://${config.user}:${config.password}@${config.host}`;

  const filteredURL = filterURLPassword(baseUrl);

  app.coreLogger.info(`[egg-jenkins] ${filteredURL}`);

  const jenkins_config = {
    baseUrl,
    promisify: config.promisify || true,
    crumbIssuer: config.crumbIssuer || false,
  };

  const jenkins = new Jenkins(jenkins_config);

  app.beforeStart(async () => {
    try {
      const data = await jenkins.info();
      app.coreLogger.info(`[egg-jenkins] instance server information:${data.nodeDescription}`);
    } catch (error) {
      app.coreLogger.info(`[egg-jenkins] instance server get error:${error}`);
    }

  });
  return jenkins;
}

function filterURLPassword(input) {
  const index = input.indexOf('@');
  if (index === -1) return input;
  const startIndex = input.lastIndexOf(':', index);
  return input.substring(0, startIndex + 1) + '******' + input.substring(index);
}
