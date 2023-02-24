const request = require('./request.js');

class SecunaAPI {
    static test(){
        return 'test';
    }

    static signup(user){
        return request('POST', '/signup', user);
    }

    static signin(user){
        return request('POST', '/signin', user);
    }

    static verify(accessToken, code){
        const headers = {
            'Authorization' : 'Bearer ' + accessToken
        }
        return request('POST', '/2fa/verify', code, headers);
    }



}

module.exports = SecunaAPI;
