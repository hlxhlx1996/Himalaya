var users = require('./../server/controllers/users.js');
var globalD = require('./../server/controllers/global.js');
  module.exports = function(app) {
    app.post('/charge',function(req,res){
      var stripe = require("stripe")("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
      var stripeToken = req.body.id;     
      var charge = stripe.charges.create({
        amount: req.body.amount, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
        }
      })
    });

    // Alex______
    // <----------------| BEGIN || POSTS |------------------------->
    app.post('/add_post', function(req, res) {
      console.log("add post in route");
      users.add_post(req.body, res);
    });
    app.get('/get_posts/:id', function(req, res) {
      users.get_posts(req, res);
    });
    app.get('/getFollow/:id', function(req, res) {
      users.getFollow(req, res);
    });
    app.post('/deletePost/:id', function(req, res) {
      users.deletePost(req, res);
    });
    app.post('/unfollow', function(req, res) {
      users.unfollow(req.body, res);
    });
    app.get('/getPostDetail/:id', function(req, res) {
      users.getPostDetail(req, res);
    });
    app.post('/up', function(req, res) {
      console.log("update support in route");
      users.up(req.body, res);
    });
    // <----------------| END || POSTS |------------------------->
    // <----------------| BEGIN || COMMENTS |------------------------->
    app.post('/add_comment', function(req, res) {
      console.log("add comment in route");
      users.add_comment(req.body, res);
    });
    app.get('/get_comments/:id', function(req, res) {
      users.get_comments(req, res);
    });
    app.post('/likeComment', function(req, res) {
      console.log("like comment in route");
      users.likeComment(req.body, res);
    });
    // <----------------| END || COMMENTS |------------------------->
    // <----------------| BEGIN || Global:Tags,Users | USING globalD BACK CONTROLLER|------------------------->
    app.get('/get_global_tags', function(req, res) {
      globalD.get_global_tags(req, res);
    });
     app.get('/get_global_users/:id', function(req, res) {
      globalD.get_global_users(req, res);
    });
      app.get('/get_global_posts', function(req, res) {
      globalD.get_global_posts(req, res);
    });
    app.get('/get_global_cates', function(req, res) {
      globalD.get_global_cates(req, res);
    });
    app.get('/getTagInfo/:tag', function(req, res) {
      users.getTagInfo(req, res);
    }); 
    app.get('/getCateInfo/:cate', function(req, res) {
      users.getCateInfo(req, res);
    });    
    // <----------------| END || Tags |------------------------->
    app.get('/getUserDetail/:id', function(req, res) {
      users.getUserDetail(req, res);
    });
    app.post('/follow', function(req, res) {
      console.log("follow in route");
      users.follow(req.body, res);
    });


    app.get('/delete_appointment/:user_id/:id', function(req, res) {
      console.log('delete this');
      users.delete_appointment(req.params, res);
    });

}