var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
module.exports = {
   entry: "./src/main.jsx", 
   output:{
       path: path.resolve(__dirname, './public'),     
       filename: "bundle.js"  
   },
   devServer: {
     historyApiFallback: true,
   },
   module:{
    rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },

        {
            test: /\.jsx$/, 
            exclude: /(node_modules)/,  
            loader: "babel-loader",  
            options:{
                presets:["@babel/preset-env", "@babel/preset-react"]   
            }
        },
      ],
    
   },
   plugins: [ 
    new HtmlWebpackPlugin({
           template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ 
         filename: '[name].css', 
    })
    ]
}