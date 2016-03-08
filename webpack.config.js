var path = require('path');

module.exports = {
  entry: [
    'reflect-metadata',
    path.normalize('zone.js/dist/zone-microtask'),
    path.resolve('app/app')
  ],
  output: {
    path: path.resolve('www/build/js'),
    filename: 'app.bundle.js',
    pathinfo: false // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          'doTypeCheck': true
        },
        include: path.resolve('app'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: path.resolve('node_modules/angular2'),
        loader: 'strip-sourcemap'
      }
    ],
    noParse: [
      /reflect-metadata/,
      /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
    ]
  },
  resolve: {
    root: [
      'app'
    ],
    alias: {
      'angular2': path.resolve('node_modules/angular2'),
    },
    extensions: ["", ".js", ".ts"]
  }
};
