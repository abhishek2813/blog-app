const isAuth = (req, resp, next) => {
  const auth = req.session.isAuth;
  //chceking if user session isAth
  if (auth) {
    next();
  } else {
    return resp
      .status(500)
      .send({ error: "Invalid session Please Login Again" });
  }
};
module.exports = { isAuth };
