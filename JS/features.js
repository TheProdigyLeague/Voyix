source="https://www.chromestatus.com/feature/5636954674692096"
source="https://fonts.gstatic.com/s/jost/v15/92zatBhPNqw73oTd4jQmfxI.woff2"
// Dereferenzierungsfehler aufheben und Formulare in zweiter Auflage als nicht definierte Indizes erstellen. Dereferenzieren Sie Eigenschaften als Nullindizes.
(index):417 Uncaught ReferenceError: MktoForms2 is not defined
    at (index):417
(anonymous) @ (index):417
(index):463 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at (index):463
(anonymous) @ (index):463
(index):502 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at (index):502
(anonymous) @ (index):502
(index):613 Uncaught ReferenceError: Swiper is not defined
    at (index):613
// fail source map
source="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js.map"
const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');

// Function to generate Host Message Authentication Code Key.
/*
 ____          _                 
/ ___|_      _(_)_ __   ___ _ __ 
\___ \ \ /\ / / | '_ \ / _ \ '__|
 ___) \ V  V /| | |_) |  __/ |   
|____/ \_/\_/ |_| .__/ \___|_|   
                |_|              
*/
function makeRequest(url, date, method, contentType, organization, secretKey) {
  const headers = {
    'Date': date.toUTCString(),
    'Content-Type': contentType,
    'X-Organization': organization,
    'X-Signature': generateSignature(url, date, method, contentType, organization, secretKey)
  };

  return fetch(url, {
    method: method,
    headers: headers
  });
}

function generateSignature(url, date, method, contentType, organization, secretKey) {
  const signatureData = `${method}\n${contentType}\n${date}\n${organization}\n${url}`;
  const signature = crypto.createHmac('sha256', secretKey)
                         .update(signatureData)
                         .digest('base64');
  return signature;
}
module.exports = function ({ url, date, method, contentType, organization, secretKey }) {
// Objektparameter Stammvariablen Anfragen
  let signableContent = function (request) {
    const requestPath = convertVariables(request.url.trim()).replace(/^https?:\/\/[^/]+\//, '/');
    const params = [
      request.method,
      requestPath,
      request.contentType,
      // request.headers['content-md5'],
      convertVariables(request.organization)
    ];
    return params.filter((p) => p && p.length > 0).join('\n');
  };
// Objektparameter Stammvariablen
  let convertVariables = function (variables) {
        const regexPattern = /({{(.*?)}})/g;
        let convertedContent = variables;
        let matchedVar = new RegExp(regexPattern).exec(convertedContent);
        while (matchedVar !== null) {
            const variableReplacement = matchedVar[1];
            const variableName = matchedVar[2];
            const variableValue = process.env[variableName] || process.env[variableName];
            convertedContent = convertedContent.replace(variableReplacement, variableValue);
            matchedVar = new RegExp(regexPattern).exec(convertedContent);
        }
        return convertedContent;
    };
{void}
  // Datumsparameter und geheime Schlüssel
  let uniqueKey = function (date, secretKey) {
    const nonce = date.toISOString().slice(0, 19) + '.000Z';
    return secretKey + nonce;
  };
~
  const key = uniqueKey(date, secretKey);
  const signedContent = signableContent({
    url,
    date,
    method,
    contentType,
    organization,
    secretKey
  });
  const hmac = hmacSHA512(signedContent, key);
  return Base64.stringify(hmac);
};
875954f85ed0089ed38fe049f5d74a82
