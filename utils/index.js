const formatResponse = res => {
  return res;
}

const succeed = data => {
  return formatResponse({
    success: true,
    code: 200,
    message: '',
    data,
  });
}

const failed = error => {
  return formatResponse({
    success: false,
    code: 500,
    message: error.message,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
}

module.exports = {
  succeed,
  failed,
}