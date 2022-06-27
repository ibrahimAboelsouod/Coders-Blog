import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto';

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {

    const {email, firstName, lastName, userName, password} = req.body;
    if ( !email || !firstName || !lastName || !userName || !password){
        return res.status(400).send('all fields are requerd');
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUserName(userName);
    if (existing){
        return res.status(403).send('User is already exist');
    }

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        userName,
        password,
    }

    await db.createUser(user);
    return res.sendStatus(200);

};


export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req,res) =>{
    const {login , password} = req.body;
    if ( !login || !password){
        return res.status(400);
    }

    const existing = (await db.getUserByUserName(login) || await db.getUserByEmail(login));
    if (!existing || existing.password !== password){
        return res.sendStatus(403);
    }


    return res.status(200).send({
        email:      existing.email,
        firstName:  existing.firstName,
        lastName:   existing.lastName,
        userName:   existing.userName,
        id:         existing.id
    }
    );

    
}
