import jenkins from "jenkins";

declare module "egg" {
  // extend app
  interface Application {
    jenkins: typeof jenkins;
  }

  type Client = {
    host: string;
    user: string;
    password: string;
  };

  // extend your config
  interface EggAppConfig {
    jenkins: {
      client: Client;
    };
  }
}
