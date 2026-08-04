const Request = require('../models/Request');
const User = require('../models/User');
const Department = require('../models/Department');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res, next) => {
  let matchCondition = {};
  if (req.user.role === 'employee') matchCondition.user = req.user.id;
  else if (req.user.role === 'manager') matchCondition.status = 'pending';

  const totalRequests = await Request.countDocuments(matchCondition);
  const pendingRequests = await Request.countDocuments({ ...matchCondition, status: 'pending' });
  const approvedRequests = await Request.countDocuments({ ...matchCondition, status: 'approved' });
  const rejectedRequests = await Request.countDocuments({ ...matchCondition, status: 'rejected' });

  res.status(200).json({
    success: true,
    data: { totalRequests, pendingRequests, approvedRequests, rejectedRequests }
  });
});