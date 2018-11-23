const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
        dash: './src/dash.js',
        checkToken: './src/checkToken.js',
        getProducts: './src/getProducts.js',
        singleProduct: './src/getSingleProduct.js',
        postProducts: './src/postProducts.js',
        category: './src/newCategory.js',
        allsales: './src/getSales.js',
        singleSalesAdmin: './src/userSales.js',
        newStaff: './src/newUser.js',
        staff: './src/users.js',
        updateRole: './src/userUpdate.js',
        getAttProducts: './src/getAttProducts.js',
        attSales: './src/attSales.js',
        cart: './src/cart.js'



    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    }
};