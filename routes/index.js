/*
 * GET home page.
 */

var r = require("./router.js").router;

router = new r();

exports.index = function(req, res){
  if(router.route(req.params.user)) {
    res.render('index', { title: 'You win!' })
  }
  else {
    res.render('index', { title: 'You loose!' })
  }
};

exports.register = function(req, res) {
  router.register(req.params.user, {});
  res.render('index', { title: 'Cool!' })
};
