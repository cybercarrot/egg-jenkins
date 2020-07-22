'use strict';

const mock = require('egg-mock');

describe('test/jenkins.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/jenkins-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, jenkins')
      .expect(200);
  });
});
