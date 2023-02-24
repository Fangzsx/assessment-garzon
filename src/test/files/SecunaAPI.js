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

    static submitReport(accessToken, report){
        const headers = {
            'Authorization' : 'Bearer ' + accessToken
        }
        return request('POST', '/reports', report, headers);
    }

    static getReports(accessToken){
        const headers = {
            'Authorization' : 'Bearer ' + accessToken
        }
        return request('GET', '/reports', undefined, headers);
    }

    static deleteReport(accessToken, id){
        const headers = {
            'Authorization' : 'Bearer ' + accessToken
        }
        return request('DELETE', `/reports/${id}`, undefined, headers);
    }
}

module.exports = SecunaAPI;
