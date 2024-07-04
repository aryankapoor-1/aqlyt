exports.okResponse = (res, success, msg, data) => {
  return res.status(200).json({
    status: 200,
    success: success,
    msg: msg,
    data: data,
  });
};

exports.okResponseWithToken = (res, success, msg, token, data) => {
  return res.status(200).json({
    status: 200,
    success: success,
    msg: msg,
    token: token,
    data: data,
  });
};

exports.createdSuccessfully = (res, success, msg, data) => {
  return res.status(201).json({
    status: 201,
    success: success,
    msg: msg,
    data: data,
  });
};

exports.errorResponse = (res, success, msg) => {
  return res.status(400).json({
    status: 400,
    success: success,
    msg: msg,
  });
};

exports.errorResponseWithData = (res, success, msg, data) => {
  return res.status(400).json({
    status: 400,
    success: success,
    msg: msg,
    data: data,
  });
};

exports.unauthorizeResponse = (res, success, msg) => {
  return res.status(401).json({
    status: 401,
    success: success,
    msg: msg,
  });
};

exports.notFoundResponse = (res, success, msg) => {
  return res.status(404).json({
    status: 404,
    success: success,
    msg: msg,
  });
};

exports.internalServerErrorResponse = (res, success, msg, data) => {
  return res.status(500).json({
    status: 500,
    success: success,
    msg: msg,
    data: data,
  });
};
