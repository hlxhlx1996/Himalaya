var users = require('./../server/controllers/UserServerController.js');
var products = require('./../server/controllers/ProductServerController.js');
var orders = require('./../server/controllers/OrderServerController.js');
  module.exports = function(app) {
    // <----------------| BEGIN || USERS |------------------------->
    app.post('/user_register', function(req, res) {
      console.log("add post in route");
      users.user_register(req, res);
    });
    app.get('/get_user/:id', function(req, res) {
      users.get_user(req, res);
    });
    app.get('/get_user_by_name/:username', function(req, res) {
      users.get_user_by_name(req, res);
    });
    app.get('/get_global_users',function(req, res) {
      users.get_global_users(req, res);
    });
    app.get('/get_user_selling/:id',function(req,res){
      users.get_user_selling(req,res);
     });

    // <----------------| BEGIN || PRODUCTS |------------------------->
    app.post('/add_product',function(req,res){
      products.add_product(req,res);
    })

    app.post('/add_to_product_bidding_list',function(req,res){
      products.add_to_product_bidding_list(req,res);
    })
    
    app.get('/get_all_products_by_user/:id',function(req,res){
      products.get_all_products_by_user(req,res);
    })
    app.get('/get_all_products',function(req,res){
      products.get_all_products(req,res);
    })
     app.get('/get_all_category',function(req,res){
      products.get_all_category(req,res);
     })
     app.post('/rate_product',function(req,res){
      products.rate_product(req,res);
     })

    // <----------------| BEGIN || ORDERS |------------------------->
     app.post('/add_order',function(req,res){
      orders.add_order(req,res);
    })
     app.post('/add_bid_order',function(req,res){
      orders.add_order(req,res);
      products.bid_sold(req,res);
    })
     app.get('/get_order_by_user/:id',function(req,res){
      orders.get_order_by_user(req,res);
     })
     app.post('/completeOrder/:id',function(req,res){
      orders.completeOrder(req,res);
     })

  }