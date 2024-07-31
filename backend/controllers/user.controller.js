import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(4000).json({
        message: 'Something is missing',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists with the same mail.',
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: 'Account Created Successfully',
      success: true,
    });
  } catch (error) {
    console.log(Error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(4000).json({
        message: 'Something is missing',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Incorrect email or password.',
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Incorrect email or password.',
        success: false,
      });
    }
    // CHECK WHETHER ROLE IS CORRECT OR NOT

    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with the current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(Error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out Successfully.',
      success: true,
    });
  } catch (error) {
    console.log(Error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(4000).json({
        message: 'Something is missing',
        success: false,
      });
    }

    // CLOUDINARY WILL COME HERE

    const skillsArray = skills.split(',');
    const userId = req.id; // FROM MIDDLEWARE AUTHENTICATION
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: 'User Not Found.',
        success: false,
      });
    }

    // UPDATING DATA
    (user.fullname = fullname),
      user,
      (email = email),
      (user.phoneNumber = phoneNumber),
      (user.profile.bio = bio),
      (user.profile.skills = skillsArray);

    // REUSME WILL BE ADDED BELOW LATER (AFTER ADDING CLOUDINARY)

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: 'Profile Updated Successfully.',
      user,
      success: true,
    });
  } catch (error) {
    console.log(Error);
  }
};
