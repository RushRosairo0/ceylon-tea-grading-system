const bcrypt = require('bcrypt');

const CustomError = require('../util/customeError');
const jwtService = require('./jwt.service');
const userRepo = require('../repos/user.repo');

const userService = {
  userRegistration: async (data) => {
    const { name, email, password, experience } = data;

    // check if user is already registered
    const user = await userRepo.getByEmail(email);
    if (user) {
      throw new CustomError('User with this email already exists!', 400);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
      experience: experience,
    };
    const newUser = await userRepo.create(userDetails);

    // user response
    const userRes = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      experience: newUser.experience,
    };

    return {
      success: true,
      status: 201,
      data: {
        user: userRes,
      },
    };
  },

  userLogin: async (data) => {
    const { email, password } = data;

    // check if user registered
    const user = await userRepo.getByEmail(email);
    if (!user) {
      throw new CustomError('Invalid login credentials!', 401);
    }

    // validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError('Invalid login credentials!', 401);
    }

    // generate access token
    const tokenUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
    const accessToken = await jwtService.generateAccessToken(tokenUser);

    // user response
    const userRes = {
      id: user.id,
      name: user.name,
      email: user.email,
      experience: user.experience,
    };

    return {
      success: true,
      status: 200,
      data: {
        user: userRes,
      },
      accessToken: accessToken,
    };
  },

  getUserDetails: async (reqUser) => {
    const user = await userRepo.getById(reqUser.id);

    // user response
    const userRes = {
      id: user.id,
      name: user.name,
      email: user.email,
      experience: user.experience,
    };

    return {
      success: true,
      status: 200,
      data: {
        user: userRes,
      },
    };
  },
};

module.exports = userService;
