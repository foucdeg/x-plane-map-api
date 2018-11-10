/* eslint import/no-extraneous-dependencies: 0 */
const shipitDeploy = require('shipit-deploy');
const shipitYarn = require('shipit-yarn');

module.exports = function shipitConfig(shipit) {
  shipitDeploy(shipit);
  shipitYarn(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/x-plane-map-api',
      deployTo: '/home/fouc/x-plane-map-api',
      repositoryUrl: 'https://github.com/foucdeg/x-plane-map-api',
      ignores: ['.git'],
      keepReleases: 3,
      deleteOnRollback: false,
      shallowClone: true,
      yarn: {
        remote: true,
        cmd: 'client:build'
      },
    },
    prod: {
      servers: [
        {
          host: 'vps',
          user: 'fouc',
        },
      ],
    },
    konstantin: {
      servers: [
        {
          host: 'konstantin',
          user: 'root',
        },
      ],
      deployTo: '/var/www/x-plane-map-api',
      branch: 'konstantin-icons'
    },
  });

  shipit.task('pm2-reload', () => {
    shipit.remote('pm2 reload ecosystem.config.js --only x-plane-map-api');
  });

  shipit.on('deployed', () => {
    shipit.start('pm2-reload');
    shipit.emit('reloaded');
  });

  shipit.task('chmod-release', () => {
    shipit.remote(`chmod a+x ${shipit.releasePath}`);
  });

  shipit.on('updated', () => {
    shipit.start('chmod-release');
    shipit.emit('chmodded');
  });
};
