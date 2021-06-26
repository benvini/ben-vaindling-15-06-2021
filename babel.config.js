module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {moduleName: '@env', path: '.env', blacklist: null, whitelist: null, safe: true, allowUndefined: true}],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./ts'],
        alias: {
          '~': './ts',
        },
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
      },
    ],
  ],
};
