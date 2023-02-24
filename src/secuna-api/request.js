const BASE_URL = 'http://ec2-13-250-105-182.ap-southeast-1.compute.amazonaws.com/api/v1';
const defaultHeaders = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
}

function request(method, path, body, headers){
    const finalHeaders = {
    ...defaultHeaders,
    ...headers,
    ...(headers && headers.Authorization ? { Authorization: headers.Authorization } : {})
  };
    return fetch(BASE_URL + path, {
        method : method,
        headers : finalHeaders,
        body : JSON.stringify(body)
    })
}

module.exports = request;
