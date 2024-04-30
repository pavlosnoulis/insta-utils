import Parse from "parse/node.js";

/**
 * @param {object} options
 * @param {string} options.serverUrl - if missing try process.env.PARSE_SERVER_URL;
 * @param {string} options.appId - if missing try process.env.PARSE_APP_ID;
 * @param {string} options.jsKey - if missing try process.env.PARSE_JS_KEY;
 * @param {string} options.masterKey - if missing try process.env.PARSE_MASTER_KEY
 *
 * @example
 * const client = getClientParseInstadata()
 *
 */
function getClientParseInstadata(options) {
  options ||= {};
  options.serverUrl = options.serverUrl || process.env.PARSE_SERVER_URL;
  options.appId = options.appId || process.env.PARSE_APP_ID;
  options.jsKey = options.jsKey || process.env.PARSE_JS_KEY;
  options.masterKey = options.masterKey || process.env.PARSE_MASTER_KEY;

  if (
    !(options.serverUrl && options.appId && options.jsKey && options.masterkey)
  ) {
    throw new TypeError(
      `Invalid argument 'options:${JSON.stringify(options)}'`,
    );
  }

  Parse.initialize(options.appId, options.jsKey, options.masterKey);
  Parse.serverURL = options.serverUrl;
  return Parse;
}

export { getClientParseInstadata };
