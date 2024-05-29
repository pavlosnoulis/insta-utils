import cryptojs from "crypto-js";

const salt = "500 Server error";

function decodeRequest(encodedRequest) {
  return JSON.parse(
    cryptojs.AES.decrypt(encodedRequest.replace(/\s/g, ""), salt).toString(
      cryptojs.enc.Utf8,
    ),
  );
}

export { decodeRequest };
