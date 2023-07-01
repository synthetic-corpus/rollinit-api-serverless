import { HttpReplyMessage } from '../../interfaces/responses.interface.js'
import { EncounterModel } from './schemas/encounter.schema.js'
import { EncounterPatch,Encounter } from '../../interfaces/encounter.interface.js'
import { stringify } from 'querystring'

export async function createEncounter(encounter: Encounter): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newEncounter = new EncounterModel(encounter)
        await newEncounter.save()
        reply = {code: 201,message: "New Encounter Created!"}
    }catch(e){
        reply = {code: 503,message: "Internal server side error" }
        console.error(`Could Not Write Encounter to Database \n ${e}`)
    }
    return reply
}

export async function retrieveEncounter(userId: String, encounterId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const encounter = await EncounterModel.findOne({_user_id: userId, _id: encounterId}).exec()
        if(encounter){
            reply = {code: 200,message: "Found the encounter!",data: encounter}
        }else{
            throw new Error(`No encounter Found with Id: ${encounterId}`)
        }
    }catch(e){
        reply= {code: 404,message: "Encounter was not Found!"}
        console.error(`Possible Database Related Error \n ${e}`)
    }
    return reply
}

export async function searchEncounters(search: {_user_id: string, _campaign_id?: string}){
    let reply: HttpReplyMessage
    try{
        const encounters = await EncounterModel.find(search)
        if(encounters){
            reply = {code: 200,message: "We found your encounters!",data: encounters}
        }else{
            const parameters = stringify(search)
            throw new Error(`No encounters! Search was ${parameters}`)
        }
    }catch(e){
        reply= {code: 404,message: "Encounter was not Found!"}
        console.error(`Possible Database Related Error \n ${e}`)
    }
    return reply
}

export async function updateEncounter(userId: string, encounterId: string, encounterPatch: EncounterPatch): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    try{
        const updatedEncounter = await EncounterModel.findOneAndUpdate({_user_id: userId, _id: encounterId},encounterPatch)
        if (updatedEncounter){
            const data: EncounterPatch = {
                _campaign_id: updatedEncounter._campaign_id,
                name: updatedEncounter.name,
                npcs: updatedEncounter.npcs
            }
            reply = {code: 201,message: "encounter updated",data: data}
            await updatedEncounter.save()
        }else{
            reply = {code: 404,message: "Unable to update user! Possibly Not found!"}
        }  
    }catch(e){
        console.error(`error updating user! \n ${e}`)
        reply = {
            code: 500,
            message: "Unable to Update User!"
        }
    }
    return reply;
}

export async function deleteEncounter(userId: string, encounterId: string): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const deletedEncounter = await EncounterModel.findOneAndDelete({_user_id: userId, _id: encounterId});
        if(deletedEncounter){
            reply = {code: 202,message: "Encounter has been removed!"}
            console.log(`Deleted User _id: ${deletedEncounter._id}`)
        }else{
            reply = {code: 404,message: "Could not Find encounter to delete!"}
        }
    }catch(e){
        console.error(`error updating encounter at Database layer! \n ${e}`)
        reply = {code: 500,message: "Unable to Delete or find Encounter!"}
    }
    return reply
}