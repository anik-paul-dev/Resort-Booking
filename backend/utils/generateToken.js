const jwt = require('crypto');

// Generate JWT
exports.generateJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate reset password token
exports.generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return {
    resetToken,
    resetPasswordToken,
    resetPasswordExpire
  };
};
