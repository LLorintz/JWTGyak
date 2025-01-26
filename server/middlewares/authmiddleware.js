const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  const authHeaders = req.headers["authorization"];

  if (authHeaders) {
    let token = authHeaders.split(' ')[1]; // Kivesszük a Bearer token-t

    try {
      const decoded = jwt.verify(token, 'SECRETKEY'); // Ellenőrizzük a token érvényességét

      if (decoded) {
        const username = decoded.username;
        const persistedUser = users.find((user) => user.username === username);

        if (persistedUser) {
          next(); // Ha a felhasználó létezik, engedjük a kérést
        } else {
          res.status(404).json({ success: false, message: "User does not exist" });
        }
      } else {
        res.status(401).json({ success: false, message: "No valid token found" });
      }
    } catch (error) {
      // Lejárt token esetén is kezeljük külön a hibát
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ success: false, message: "Token has expired" });
      } else {
        res.status(401).json({ success: false, message: "Token has been tampered with" });
      }
    }
  } else {
    res.status(401).json({ success: false, message: "No authorization headers found" });
  }
}

module.exports = authenticate;
