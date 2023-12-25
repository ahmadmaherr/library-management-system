import { verifyJWTToken } from './auth.js';
import rateLimit from 'express-rate-limit';

export function verifyJWT_MW(req, res, next) {
    let token = req.headers.auth;

    verifyJWTToken(token)
            .then((decodedToken) => {
                req.user = decodedToken;
                next()
            })
            .catch((err) => {
                res.send({
                    status: 400,
                    errorMessage: 'Invalid auth token provided.'
                });
            });

}

export const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // maximum number of requests allowed in the windowMs
    message: 'Too many requests, please try again later.',
});
  