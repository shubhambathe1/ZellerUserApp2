const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Force Metro to look for .js and .cjs files specifically
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
    // Ensure it prioritizes the main field over module/esm fields
    resolverMainFields: ['main', 'browser'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
