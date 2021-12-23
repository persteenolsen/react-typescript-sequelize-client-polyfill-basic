const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
    
  // NOTE: 15-12-2021: The support of IE 11 is done by the use of Browserslist in package.json combined with core-js3 - babel@preset-ent - usebuiltin: usage 
  // The npm package query-string NEEDS to be version 5 instead of 6 to support IE 11
  // ENABLE "target: 'web'"  for use Hot Reload / HMR in Crome ( not in IE 11 )
  // DISABLE "target: 'web'" for use IE 11 during testing => Hot Reload / HMR will stop working in Chrome due to a bug in Webpack 5
  target: 'web', 

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
	
	// NOTE: Using webpack-dev-server > 4 and webpack-cli > 4 contentBase needs to be replaced by static !!
    // contentBase: paths.build,
    static: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  
  // Note: Placed to webpack.common.js while needed both in dev + prod ! 
  /* externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }, */

  plugins: [
    
	// Note: Only update what has changed on hot reload 
	// Require the statement "module.hot.accept();" in the root index.jsx !
    new webpack.HotModuleReplacementPlugin(),
	
	new FriendlyErrorsPlugin()
  ],
})
