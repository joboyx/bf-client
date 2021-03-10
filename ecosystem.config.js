module.exports = {
  apps : [{
    name: 'bf-client',
    exec_mode: 'cluster',
    instances: 6,
    script: 'npm',
    args: 'start'
  }],
};
