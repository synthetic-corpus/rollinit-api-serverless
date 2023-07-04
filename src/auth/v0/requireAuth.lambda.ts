
import { verifyToken, getUserId } from './authUtils.js'
import { JwtPayload } from '../interfaces.js';


export function requireAuthMiddy(){
    async function requireAuthBefore(request: any){
        // Do the Logic with the request as expected
        if (!request.event.headers || !request.event.headers.authorization){
           // Throw an Authentication error.
           throw new Error('No Auth Token present!')
        }
    
        const tokenBearer = request.event.headers.authorization.split(' ');
        if (tokenBearer.length != 2) {
            // Throw an Authentication error
            throw new Error('Malformed token.');
        }
        try{
            // If it Verified, go on to the actual HTTP call with Next
            const jwtToken: JwtPayload = await verifyToken(request.event.headers.authorization)
            console.log("made JWT Tokent?")
            console.log(jwtToken)
            const user_id: string = getUserId(request) || '' // For ease of getting User_id for the Database. Need to know the exact anatomy of the request!
            if(!user_id){
                throw new Error("Failed to get User ID from Token!")
                // Throw an Auth Error
                //return res.status(500).send("Problem with user identification.!")
            }
            
            request.event.body.user_id = user_id // Unsure if this is accurate for lambdas must review
        } catch(e){
            // if Not Verified, through a 403
            console.log(e);
            // Throw an Auth Error
            throw new Error("Auth Token not Verified!")
        }
    }
    return {
        before: requireAuthBefore
    }
}