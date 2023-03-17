const { User } = require('../app/models');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user, "data user di isApproval")
    if (user.role === 'Approval') return next();
    throw new Error();
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      message: 'hanya bisa diakses oleh approval',
    });
  }
};
module.exports = isAdmin;