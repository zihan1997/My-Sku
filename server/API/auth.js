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
        // console.log(user);

        // check if user exists
        const query = await Auth.find({username: user.username});
        if(query.length !== 0) return ctx.status = 226;

        // create new user
        const token = generateToken(user);
        await Auth.create(user);

        ctx.body = {
            username: user.username,
            token: token
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
        const toBeVerifiedUser = {
            username: username,
            password: password,
        };

        // verify the user
        const matchUser = await Auth.find(toBeVerifiedUser);
        // console.log("finding: " + matchUser);
        if(!matchUser) return ctx.status = 401;

        // const jwt_token =
        // const one = await Auth.updateOne(
        //     {username: username},
        //     {jwt_token: jwt_token})

        ctx.body = generateToken(toBeVerifiedUser);
        // console.log("one " + one[1]);
        // console.log("token " + jwt_token)


    })

    /**
     * clear tokens regarding user
     */
    router.del('/logout', async ctx => {
        ctx.status = 204;
    })
}