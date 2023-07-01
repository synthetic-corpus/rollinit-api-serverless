import * as Encounter from '../../interfaces/encounter.interface.js';
import * as DB from '../../03data/v0/encounter.mongo.js';
import { convertUserId } from '../../03data/v0/convertUserId.js';
import { HttpReplyMessage } from '../../interfaces/responses.interface.js'


export async function createEncounter(userId: String, encounterPost: Encounter.EncounterHttp): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const encounter: Encounter.Encounter = {
        _user_id: db_uuid,
        ...encounterPost
    }
    const reply: HttpReplyMessage = await DB.createEncounter(encounter);
    return reply
}

export async function getEncounter(userId: string, encounterId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    //console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveEncounter(db_uuid, encounterId)
    return reply
}

export async function getAllEncounters(search: {_user_id: string, _campaign_id?: string}): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(search._user_id)
    search._user_id = db_uuid
    //console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.searchEncounters(search)
    return reply
}

export async function patchEncounter(userId: String, encounterId: string, update: Encounter.EncounterPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateEncounter(db_uuid,encounterId,update)
    return reply
}

export async function deleteEncounter(userId: String, encounterId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteEncounter(db_uuid, encounterId)
    return reply
}