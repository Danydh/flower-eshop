const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = async(req, res, next) => {
  try {
    let fetchedUser;
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    fetchedUser = user;
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      process.env.JWT_KEY ,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  } catch (err) {
    return res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }
}
