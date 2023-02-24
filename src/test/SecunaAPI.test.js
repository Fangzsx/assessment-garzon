const SecunaAPI = require('./files/SecunaAPI.js');
const request = require('./files/request.js');

xtest('static test function', () => {
    expect(SecunaAPI.test()).toBe('test');
});

xtest('signup a new user', done => {
    const user = {
        username : 'johndoe41',
        email : 'johndoe41@gmail.com',
        password : 'Pass123$',
        password_confirmation : 'Pass123$'

    }

    SecunaAPI.signup(user)
        .then(response => {
            expect(response.status).toBe(200);
            return response.json();
        })
        .then(data => {
            expect(data.status.toLowerCase()).toBe('success');
            done();
        })
        .catch(() => done('SIGNUP : Failed'))
})

xtest('not signup a new user with missing fields', done => {
    const user = {
        username : 'johndoe3',
        password : 'Pass123$',
    }

    SecunaAPI.signup(user)
        .then(response => {
            expect(response.status).toBe(422);
            done();
        })
        .catch(() => done('SIGNUP : Missing fields'))
})
xtest('signin a user', done => {
    const user = {
        email : 'johndoe3@gmail.com',
        password : 'Pass123$',
    }

    SecunaAPI.signin(user)
        .then(response => {
            expect(response.status).toBe(200);
            return response.json();
        })
        .then(data => {
            console.log('data', data);
            expect(data).toBeTruthy();
            done();
        })
        .catch(() => done('SIGNIN : Failed'));
})

test('2fa', done => {
    //fetch access token from previous signin via copy paste and enter the code in google authenticator
    const accessToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJhdWQiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJpYXQiOjE2NzcyMzk1OTgsIm5iZiI6MTY3NzIzOTU5OCwiZXhwIjoxNjc3MjQzMTk4LCJkYXRhIjoiQVBZNDJTMlc3Q1ZGTkpZSiJ9.asx68vTx96i4ZjBzVCUUjNhNJ-X3uPr12PIRtpsGbG4';
    const code = {
        code : '294361'
    }
    SecunaAPI.verify(accessToken, code)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            expect(data).toBeTruthy();
            done();
        })
})

xtest('submit a report', done => {
    const report = {
        vulnerability_type : 'test',
        severity_level : 'Medium',
        title : 'test',
        description : 'test'
    }
    const verifiedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJhdWQiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJpYXQiOjE2NzcyMjA0MzUsIm5iZiI6MTY3NzIyMDQzNSwiZXhwIjoxNjc3MjI0MDM1LCJkYXRhIjoiYTdlOTkwNmEtOTIwNS00ZGUwLWIxNzItNjI4MTgyYThiYTlmIn0.u73tAe_fyHxO9XB7GUfGr-GRCrmIklt9PoXGHB-3G0E';
    SecunaAPI.submitReport(verifiedToken, report)
        .then(response => {
            expect(response.status).toBe(200);
            return response.json();
        })
        .then(data => {
            expect(data).toBeTruthy();
            done();
        })
})
xtest('should not create a report if invalid token', done => {
    const fakeToken = 'fakeToken';
    
    const report = {
        vulnerability_type : 'CWE-12 SQL INJECTION',
        severity_level : 'Low',
        title : 'SQL INJECTION',
        description : 'test description'
    }
    SecunaAPI.submitReport(fakeToken, report)
        .then(response => {
            expect(response.status).toBe(400);
            done();
        })
        .catch(() => done('Invalid Token'))
})

xtest('retrieve reports', done => {
    //extract token from authenticated user
    const verifiedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJhdWQiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJpYXQiOjE2NzcyMjA0MzUsIm5iZiI6MTY3NzIyMDQzNSwiZXhwIjoxNjc3MjI0MDM1LCJkYXRhIjoiYTdlOTkwNmEtOTIwNS00ZGUwLWIxNzItNjI4MTgyYThiYTlmIn0.u73tAe_fyHxO9XB7GUfGr-GRCrmIklt9PoXGHB-3G0E';
    SecunaAPI.getReports(verifiedToken)
        .then(response => {
            expect(response.status).toBe(200);
            return response.json();
        })
        .then(data => {
            console.log(data);
            expect(data).toBeTruthy();
            done();
        })

})

xtest('delete report', done => {
    const verifiedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJhdWQiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJpYXQiOjE2NzcyMjA0MzUsIm5iZiI6MTY3NzIyMDQzNSwiZXhwIjoxNjc3MjI0MDM1LCJkYXRhIjoiYTdlOTkwNmEtOTIwNS00ZGUwLWIxNzItNjI4MTgyYThiYTlmIn0.u73tAe_fyHxO9XB7GUfGr-GRCrmIklt9PoXGHB-3G0E';
    //get uuid of created report
    const id = 'b284ffc4-ca8b-41cc-aa3a-d845389aef76';
    SecunaAPI.deleteReport(verifiedToken, id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done();
        })
})
