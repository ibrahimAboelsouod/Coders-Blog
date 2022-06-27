import { ErrorRequestHandler } from "express";



export const requestErrorHandlingMiddleware: ErrorRequestHandler = (err, req,res,next) => {
    console.error('uncaught exeption', err);
    return res.status(500).send('please try again');
    next();
};