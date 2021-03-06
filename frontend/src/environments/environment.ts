// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const env = {
  production: false,
  // apiRoot: 'https://api.vooot.nl',
  apiRoot: 'http://localhost:8000',
  version: '0.1.0',

  getStream: {
    appKey: '96shmhxxay2d',
    appId: '16235',
    location: 'eu-west'
  }
};
