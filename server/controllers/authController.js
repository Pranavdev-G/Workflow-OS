const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, position } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('Email already in use', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'employee',
    position: position || 'Staff'
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('department', 'name');
  res.status(200).json({ success: true, data: user });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide current and new password', 400));
  }

  const user = await User.findById(req.user.id).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse('Incorrect current password', 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ 
    success: true, 
    token, 
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    } 
  });
};