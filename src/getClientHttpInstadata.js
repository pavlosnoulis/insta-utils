import fetch from "node-fetch";
import { URL, URLSearchParams } from "node:url";
import { join } from "node:path";

/*
  Exports:
  - getClientHttpInstadata
  - parseBody
  - makeHref
 */

/**
 * @param {string} origin
 * @param {object} options
 * @param {string} options.installationId - if missing try process.env
 * @param {string} options.instashopSessionToken - if missing try process.env
 * @param {string} options.parseSessionToken - if missing try process.env
 * @param {string} options.hrUserId - if missing try process.env
 *
 * @example
 * const client = getClientHttpInstadata('localhost:5000')
 * client.post('dashboard-rest/messages/update', { ...body }, {...options}) -> Promise
 *
 * @example
 * const client = getClientHttpInstadata('localhost:5000/dashboard-rest/messages/update');
 * client.post({...body}, {...options});
 *
 * @example
 * // search queries
 * client.post('messages/update?one=two,three=four', { ...body });
 *
 * @example
 * // search queries
 * client.post('messages/update', {..body}, { query: { one: two, three: four }})
 *
 * @example
 * // search queries
 * client.post('messages/update?one=two', {...body}, { query: { one: yolo, two: three }});
 */
function getClientHttpInstadata(origin, options) {
  origin = new URL(origin).toString();
  options ||= {};
  options.installationId ||= process.env.INSTALLATION_ID;
  options.instashopSessionToken ||= process.env.INSTASHOP_SESSION_TOKEN;
  options.parseSessionToken ||= process.env.PARSE_SESSION_TOKEN;
  options.hrUserId ||= process.env.HR_USER_ID;
  if (
    !(
      options.installationId &&
      options.instashopSessionToken &&
      options.parseSessionToken &&
      options.hrUserId
    )
  ) {
    throw new TypeError(
      `Invalid argument 'options:${JSON.stringify(options)}'`,
    );
  }

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9,el-GR;q=0.8,el;q=0.7",
    "Content-Type": "application/json",
    Connection: "close",
    "installation-id": options.installationId,
    "instashop-session-token": options.instashopSessionToken,
    "x-parse-session-token": options.parseSessionToken,
    "user-id": options.hrUserId,
  };

  const client = {};
  client.get = (path, options) =>
    ensureAsync()
      .then(() => makeHref([origin, path], options.query))
      .then((href) =>
        fetch(href, {
          headers,
          method: "GET",
          ...options,
        }),
      )
      .then(parseResponse)
      .then(parseInstashopResponse)
      .then(parseBody);

  client.post = async (path, body, options) =>
    ensureAsync()
      .then(() => {
        const argv = parseArgs(path, body, options);
        argv[0] = makeHref([origin, argv[0]], argv[2].query);
        return argv;
      })
      .then(([href, body, options]) =>
        fetch(href, {
          headers,
          method: "POST",
          body: JSON.stringify(body),
          ...options,
        }),
      )
      .then(parseResponse)
      .then(parseInstashopResponse)
      .then(parseBody);

  client.put = (path, body, options) =>
    client.post(path, body, { ...options, method: "PUT" });

  return client;
}

/**
 * @param {Response} res - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
function parseBody(res) {
  const mime = res.headers.get("Content-Type").split(";").at(0);
  switch (mime) {
    case "text/html":
      return res.text();
    case "application/json":
      return res.json();
    default:
      throw new Error(`Unknown response content type :${res.contentType}`);
  }
}

/**
 * @param {string|Array} paths
 * @param {object|Map|Set} query
 */
function makeHref(path, query) {
  const url = new URL(path instanceof Array ? join(...path) : path);
  for (const [k, v] of new URLSearchParams(query)) {
    url.searchParams.set(k, v);
  }
  return url.toString();
}

function parseArgs(path, body, options) {
  if (typeof path !== "string") {
    options ||= body;
    body = path;
    path = "";
  }
  return [path, body || {}, options || {}];
}

function ensureAsync() {
  return Promise.resolve();
}

function parseResponse(res) {
  if (res.status >= 200 && res.status < 300) return res;
  const err = new Error(
    `Request to '${res.url}' failed with: '${res.status}:${res.statusText}'`,
  );
  err.name = res.statusText;
  err.response = res;
  throw err;
}

async function parseInstashopResponse(res) {
  if (res.success) return res;
  const body = await parseBody(res);
  const err = new Error(
    `Request to '${res.url}' failed with: '${body.message}'`,
  );
  err.name = res.statusText;
  err.response = res;
  throw err;
}

export { getClientHttpInstadata, makeHref, parseBody };
