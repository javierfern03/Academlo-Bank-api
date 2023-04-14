const User = require('../Models/users.model');
const bcrypt = require('bcryptjs');
const generateJwt = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  const { name, password } = req.body;
  const generateAccountNumber = Math.round(Math.random() * 999999);

  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    password: encryptedPassword,
    accountNumber: generateAccountNumber,
  });

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'User has been create successfully',
    user,
    token,
  });
};

exports.login = async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber: accountNumber,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'User not found',
    });
  }

  if (!(await bcrypt.compare(password, User.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'password incorrect',
    });
  }

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'User logged',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      token,
    },
  });
};
