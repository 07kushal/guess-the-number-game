/* eslint-disable comma-dangle */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-relative-path-import',
      {
        paths: [
          {
            rootPathPrefix: '@fonts',
            rootPathSuffix: 'assets/fonts'
          },
          {
            rootPathPrefix: '@colors',
            rootPathSuffix: 'Theme/Colors.js'
          }
        ]
      }
    ]
  ]
};
