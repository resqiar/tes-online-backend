const express = require("express");
const router = express.Router();

// DB CONNECTIONS
const db = require("../db/Mysql");

router.post("/send-input-here", (req, res) => {
  const { name, age, city } = req.body;

  // split number and string from age
  // if there is no number? send error
  // if there is, exclude the string and save
  // the number into database.
  const matchAge = age.match(/\d+/g);

  if (!matchAge) {
    res.status(400).send({ error: "Age must contain number" });
  } else {
    const splittedAge = matchAge[0];

    // convert to uppercase
    const convertedName = name.toUpperCase();
    const convertedCity = city.toUpperCase();

    // SAVE DATA INTO DATABASE
    // sorry if the query is vulnerable to SQL injection attack
    // this is my first time using SQL database
    // i mostly using NoSQL databases like MongoDB.
    db.query(
      `INSERT INTO input (name, age, city) VALUES ('${convertedName}', '${splittedAge}', '${convertedCity}');`,
      (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.send({
            status: "OK",
            result: result,
            name,
            age: splittedAge,
            city,
          });
        }
      }
    );
  }
});

module.exports = router;
