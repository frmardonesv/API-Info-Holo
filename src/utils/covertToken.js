const jwt = require("jsonwebtoken");

const covertToken = (decodedToken, auth) => {
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    token = auth.substring(7);
  }

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
  }

  if (!token || !decodedToken.id) {
    return (decodedToken = { succes: false });
  }

  return decodedToken;
};

module.exports = covertToken;
