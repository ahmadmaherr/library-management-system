import jwt from 'jsonwebtoken';
import { auth } from '../../../config.js';
import _ from 'lodash';

export async function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, auth.jwt.secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

export async function createJWToken(name, email) {
    let expiresIn = 15552000; // 180 Days (60 x 60 x 24 x 180)

    let token = jwt.sign({
        name,
        email,
    }, auth.jwt.secret, {
            expiresIn,
            algorithm: 'HS256'
    });

    return token;
}

export default {
    verifyJWTToken,
    createJWToken
}
