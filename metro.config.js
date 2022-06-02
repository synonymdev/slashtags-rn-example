/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const path = require('path');
 const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
      resolver: {
        extraNodeModules: {
          ...require('node-libs-react-native'),
          "sodium-native": path.resolve(__dirname, './node_modules/react-native-libsodium'),
        },
        blacklistRE: exclusionList([/node_modules\/sodium-native\/.*/])
      },
    }),
  },
};
