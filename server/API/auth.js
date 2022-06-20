// auth.js

require('dotenv').config({path: __dirname + '/.env'});
const Auth = require('../auth/Auth');
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');


function generateToken(user) {
    return jwt.sign({username: user.username}, process.env.JWT_SCRETE, { expiresIn: '10m'});
}

module.exports = (router) => {

    /**
     * create new user
     */
    router.post('/register', async ctx => {

        const user = ctx.request.body;

        // check if user exists
        const query = await Auth.find({username: user.username}).lean();
        console.log(query)
        if(query.length !== 0) return ctx.status = 226;

        // create new user
        await Auth.create(user).then(err => ctx.status = 500);
        const token = generateToken(user);

        ctx.body = {
            message: `User: ${user.username} registered successfully!`,
            token: token,
            user: user.username
        };
        ctx.status = 201;
    })

    /**
     * log in with token
     */
    router.post('/login', async ctx => {
        const body = ctx.request.body
        const username = body.username;
        const password = body.password;

        // verify the user
        const queryOutput = await Auth.find({username: username}).lean();
        const matchUser = queryOutput[0];
        if(!matchUser || matchUser.password !== password) return ctx.status = 401;

        const token = generateToken({username: username});
        ctx.body = {
            message: "Welcome Back",
            token: token,
            user: username
        };
    })

    /**
     * clear tokens regarding user
     */
    router.del('/logout', async ctx => {
        ctx.status = 204;
    })
}