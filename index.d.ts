import * as Jenkins from "jenkins";

declare module "egg" {
  // extend app
  interface Application {
    jenkins: Jenkins.JenkinsPromisifiedAPI;
  }

  type JenkinsClient = {
    host: string;
    user: string;
    password: string;
  };

  // extend your config
  interface EggAppConfig {
    jenkins: {
      client: JenkinsClient;
    };
  }
}
