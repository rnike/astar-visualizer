module.exports = function override(config) {
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor?.name !== 'ModuleScopePlugin'
  );

  config.resolve.fallback = {
    vm: require.resolve('vm-browserify'),
  };

  return config;
};
