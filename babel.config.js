module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          rxjs: 'rxjs/dist/cjs/index.js',
        },
      },
    ],
    'react-native-reanimated/plugin', // Reanimated MUST be last
  ],
};
