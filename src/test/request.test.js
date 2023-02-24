const request = require('./files/request.js');

xtest('should perform a post request', done => {
    //make sure that the user is not yet registered.
    const user = {
        username : 'test6',
        email : 'test6@gmail.com',
        password : 'Pass123$',
        password_confirmation : 'Pass123$'
    }
    request('POST', '/signup', user)
        .then(response => {
            expect(response.status).toBe(200);
            return response.json();
        })
        .then(data => {
            expect(data.status.toLowerCase()).toBe('success');
            done();
        })
})
