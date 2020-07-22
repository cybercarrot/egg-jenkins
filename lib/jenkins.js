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

  app.coreLogger.info(`[egg-jenkins] ${baseUrl}`);

  const jenkins_config = {
    baseUrl,
    promisify: config.promisify || true,
    crumbIssuer: config.crumbIssuer || false,
  };

  const jenkins = new Jenkins(jenkins_config);

  app.beforeStart(async () => {
    const { err, data } = await jenkins.info();
    if (err) throw err;
    app.coreLogger.info(`[egg-jenkins] instance server information:${data}`);
  });
  return jenkins;
}
