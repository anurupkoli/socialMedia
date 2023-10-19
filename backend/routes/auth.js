require("dotenv").config();
const express = require("express");
const User = require("../models/MongoUser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWST = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const myToken = process.env.JWT_TOKEN;

router.post(
  "/createUser",
  [
    body("name", "Enter Your Full Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("mobileNo", "Enter valid Mobile No").isNumeric(10),
    body("password", "Enter valid Password").isLength({min:5}),
  ],
  async (req, res) => {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      let salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password,salt );

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        mobileNo: req.body.mobileNo,
      });

      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = JWST.sign(data, myToken);
      res.status(200).json(authToken);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Some error occured"})
    }
  }
);

module.exports = router;