const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const stylesHandler = 'style-loader'
const pathPrefix = process.env.PATH_PREFIX || (isProduction ? '' : '/')

const isWindows = process.platform === 'win32'

module.exports = () => {
  const config = {
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      publicPath: pathPrefix + 'public/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/', '/.yarn/'],
        },
        {
          test: /\.css$/i,
          use: [stylesHandler, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [stylesHandler, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
      alias: {
        '@zgd': path.join(__dirname, 'src'),
      },
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    devtool: 'inline-source-map',
    devServer: {
      open: false,
      host: '0.0.0.0',
      port: 8080,
    },
    watchOptions: {
      ignored: isWindows ? [] : [path.resolve(__dirname, '**', '.*.swp')],
    },
  }

  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}
