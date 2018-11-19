function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated()) {
        return next();
  }
  res.redirect('/admin');
}

function isAllreadyLoggedInAdmin(req,res,next)
{
  if(req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
        return;
  }
  return next();
}

function isLoggedInUser(req,res,next)
{
  if(req.isAuthenticated()) {
        return next();
  }
  res.redirect('/admin');
}


function isAllreadyLoggedInUser(req,res,next)
{
  if(req.isAuthenticated()) {
        res.redirect('/');
        return next();
  }
  return next();
}

module.exports = {

    'isLoggedIn'                   : isLoggedIn,
    'isAllreadyLoggedInAdmin'      : isAllreadyLoggedInAdmin,
    'isLoggedInUser'               : isLoggedInUser,
    'isAllreadyLoggedInUser'       : isAllreadyLoggedInUser
}
