const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  
  
  return {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader","stylus-loader"],
        },
      ],
    },
    plugins: [
    new webpack.DefinePlugin(envKeys),
    ["postcss-preset-env",
      {
        // Options
      }
    ]
  ]
}};

module: {
  rules: [
    {
      test: /\.css$/i,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    // Options
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  ],
}