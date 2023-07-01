import {Request, Response} from 'express'
import {NextFunction} from 'connect'
import { verifyToken, getUserId } from './authUtils.js'
import { JwtPayload } from '../interfaces.js';
import { stringify } from 'querystring';


export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    console.log("Trying to Verify")

    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({message: 'No authorization headers.'})
    }

    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({message: 'Malformed token.'});
    }


    try{
        // If it Verified, go on to the actual HTTP call with Next
        const jwtToken: JwtPayload = await verifyToken(req.headers.authorization)
        console.log("made JWT Tokent?")
        console.log(jwtToken)
        const user_id: string = getUserId(req) || '' // For ease of getting User_id for the Database.
        if(!user_id){
            console.error(`Could not get user ID from Request  ${req._read}`) 
            return res.status(500).send("Problem with user identification.!")
        }
        //console.log("Auth Layer: appending user id ",user_id," to the request")
        req.user_id = user_id
        return next()
    } catch(e){
        // if Not Verified, through a 403
        console.log(e);
        return res.status(403).send({message: 'Token not Verified.'});
    }
}

