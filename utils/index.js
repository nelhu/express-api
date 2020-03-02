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

const handleProcess = req => {
  const socket = req.socket;
  const total = req.get('Content-Length');
  req.on('data', data => {
    let process = 0;
    const loaded = socket.bytesRead;
    process = Number((loaded / total) * 100).toFixed(2);
    if (process > 100) {
      process = 100;
    }
    console.log('上传中...', process);
  })
}

module.exports = {
  succeed,
  failed,
  handleProcess,
}