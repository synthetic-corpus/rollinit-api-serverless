import { HttpReplyMessage } from '../../interfaces/responses.interface'
import { HarptosModel } from './schemas/harptos.schema'
import { HarptosCalendar, HarptosUpdate } from "../../interfaces/harptos.interface";


export async function createHarptos(harptos: HarptosCalendar): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newTent = new HarptosModel(harptos)
        await newTent.save()
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

export async function retrieveHarptos(userId: String, harptosId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const thisHarptos = await HarptosModel.findById(harptosId)
        if(thisHarptos){
            if (userId === thisHarptos._user_id.toString()){
                reply = {code: 200,message: "retrieved harptos!",data: thisHarptos}
            }else{
                reply = {code: 403,message: "You are not authorized to view this resource!"}
            }
        }else{
            reply = {code: 404,message: "No Harptos found!"}
        }
    }catch(e){
        console.log(`Error on retrieving tent at database layer for harptos: ${harptosId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function retrieveAllHarptos(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const query = {_user_id: userId}
        const theseCalendars = await HarptosModel.find(query)
        if(theseCalendars){
            reply = {code: 202,message: 'Found Harptos',data: theseCalendars}
        }else{
            reply = {code: 404,message: "No Calendar found!",data: []}
        }
    }catch(e){
        console.log(`Error on retrieving Calendar at database layer for Harptos: ${userId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function updateHarptos(userId: String, harptosId: String, harptosPatch: HarptosUpdate): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    const query = {_id: harptosId,_user_id: userId}
    try{
        const updatedHarptos = await HarptosModel.findOneAndUpdate(query,harptosPatch)
        if (updatedHarptos){
            const data = updatedHarptos
            reply = {code:201, message: "Updated Harptos",data: data}
        }else{
            console.log(`Could not find Harptos: ${harptosId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find calendar or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not retrieve Harptos: ${harptosId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}

export async function deleteHarptos(userId: String, harptosId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    const query = {_id: harptosId,_user_id: userId}
    try{
        const deletedHarptos = await HarptosModel.findOneAndDelete(query)
        if (deletedHarptos){
            const data = deletedHarptos
            reply = {code:201, message: "Removed Tent Tent",data: data}
        }else{
            console.log(`Could not find harptos to deleted: ${harptosId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find calendar or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not Delete calendar: ${harptosId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}