/*
 * GET home page.
 */

/*Catch all*/
app.get('/:user', function(req, res){
  console.log(app.socketRouter);
  if(app.socketRouter.route(req.params.user)) {
    res.render('index', { title: 'You win!' });
  }
  else {
    res.render('index', { title: 'You loose!' });
  }
});

