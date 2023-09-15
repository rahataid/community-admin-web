module.exports = {
  trailingSlash: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /magic-sdk/,
      /@walletconnect[\\/]web3-provider/,
      /@web3auth[\\/]web3auth/,
      /@walletconnect[\\/]universal-provider/,
    ];

    // Exclude 'react-native' from resolving for @walletconnect/universal-provider
    config.resolve.alias = {
      ...config.resolve.alias,
      reactNative: 'react-native-web',
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
