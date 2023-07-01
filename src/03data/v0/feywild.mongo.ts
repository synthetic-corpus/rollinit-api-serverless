import { HttpReplyMessage } from '../../interfaces/responses.interface'
import { FeywildModel } from './schemas/feywild.schema'
import { FeywildCalendar, FeywildUpdate } from "../../interfaces/feywild.interface";


export async function createFeywild(newZone: FeywildCalendar): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newFeywild = new FeywildModel(newZone)
        await newFeywild.save()
        reply = {code: 201,message: "New Calendar created!"}
    }catch(e){
        reply = {
            code: 503,
            message: "Internal server side error" 
        }
        console.error(`Could Not Write user to Database \n ${e}`)
    }
    return reply
}

export async function retrieveFeywild(userId: String, feywildId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const thisFey = await FeywildModel.findById(feywildId)
        if(thisFey){
            if (userId === thisFey._user_id.toString()){
                reply = {code: 200,message: "retrieved Fey Zone!",data: thisFey}
            }else{
                reply = {code: 403,message: "You are not authorized to view this resource!"}
            }
        }else{
            reply = {code: 404,message: "No Feywild Zone found!"}
        }
    }catch(e){
        console.log(`Error on retrieving Feywild Zone at database layer: ${feywildId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function retrieveAllFeywild(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const query = {_user_id: userId}
        const theseFeyzones = await FeywildModel.find(query)
        if(theseFeyzones && theseFeyzones.length > 0){
            reply = {code: 202,message: 'Found Fey Zones!',data: theseFeyzones}
        }else{
            reply = {code: 404,message: "No Feyzones found!",data: []}
        }
    }catch(e){
        console.log(`Error on retrieving Fey zones at database layer for tent: ${userId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function updateFeywild(userId: String, feywildId: String, feyPatch: FeywildUpdate): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    const query = {_id: feywildId,_user_id: userId}
    try{
        const updatedFeyzone = await FeywildModel.findOneAndUpdate(query,feyPatch)
        if (updatedFeyzone){
            const data = updatedFeyzone
            reply = {code:201, message: "Updated Feywild",data: data}
        }else{
            console.log(`Could not find Feyzone: ${feywildId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find Feyzone or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not retrieve Feyzones: ${feywildId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}

export async function deleteFeywild(userId: String, feywildId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    const query = {_id: feywildId,_user_id: userId}
    try{
        const deletedHarptos = await FeywildModel.findOneAndDelete(query)
        if (deletedHarptos){
            const data = deletedHarptos
            reply = {code:201, message: "Removed Tent Tent",data: data}
        }else{
            console.log(`Could not find Feywild zone: ${feywildId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find calendar or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not Deleted Feyzone: ${feywildId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}