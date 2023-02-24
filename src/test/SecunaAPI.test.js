const SecunaAPI = require('../secuna-api/SecunaAPI.js');
const request = require('../secuna-api/request.js');

test('static test function', () => {
    expect(SecunaAPI.test()).toBe('test');
});

xtest('signup a new user', done => {
    const user = {
        username : 'johndoe4',
        email : 'johndoe4@gmail.com',
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

test('not signup a new user with missing fields', done => {
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
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJhdWQiOiJodHRwOi8vMTguMTM5LjExMC4xNjciLCJpYXQiOjE2NzcyMTg5ODIsIm5iZiI6MTY3NzIxODk4MiwiZXhwIjoxNjc3MjIyNTgyLCJkYXRhIjoiQVFGUFBKSkdGRUFFQUNHNSJ9.I-eKtBBerqj_tCbROOUnrlDTIsTH6wgwnQvviSOpPKw';
    const code = {
        code : '568322'
    }
    SecunaAPI.verify(accessToken, code)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done();
        })
})


