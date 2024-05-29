const { spawn } = require("node:child_process");
const { Buffer } = require("node:buffer");

function bufferCurl(args) {
  let buffer = "";
  return new Promise((resolve, reject) => {
    try {
      const curl = spawn("curl", ["--silent", "--show-error"].concat(args));
      curl.stdout.on("data", (data) => {
        buffer += data;
      });

      curl.stderr.on("data", (data) => {
        buffer += data;
      });

      curl.on("close", (exitCode) => {
        buffer = JSON.parse(buffer);
        exitCode ? reject(buffer) : resolve(buffer);
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function post(url, data, headers = []) {
  const request = new Map();
  request.set("-H", "Content-Type: application/json");
  request.set("-d", JSON.stringify(data));

  for (const header of parseHeaders(headers)) {
    request.set("-H", header);
  }

  const argv = Array.from(request.entries()).reduce((car, [k, v]) => {
    car.push(k);
    v && car.push(v);
    return car;
  }, []);

  argv.push(url);
  return bufferCurl(argv)
    .then((response) => ({
      request,
      response,
    }))
    .catch((response) => ({
      request,
      response,
    }));
}

function parseHeaders(headers) {
  if (!headers) {
    return [];
  } else if (headers instanceof Array) {
    return headers.slice();
  } else if (headers instanceof Map) {
    const _headers = [];
    for (const [k, v] of headers.entries()) {
      _headers.push(k.concat(":", v));
    }
    return _headers;
  } else if (typeof headers === "object") {
    const _headers = [];
    for (const [k, v] of Object.entries(headers)) {
      _headers.push(k.concat(":", v));
    }
    return _headers;
  } else {
    throw new TypeError(`Wrong headers type: '${typeof headers}'`);
  }
}

export { post };
