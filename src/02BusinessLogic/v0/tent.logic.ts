import * as Tent from '../../interfaces/tent.interface.js';
import * as DB from '../../03data/v0/tent.mongo.js';
import { convertUserId } from '../../03data/v0/convertUserId.js';
import { HttpReplyMessage } from '../../interfaces/responses.interface.js'


export async function createTent(userId: String, tentPost: Tent.Tent): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    tentPost._user_id = db_uuid
    const reply: HttpReplyMessage = await DB.createTent(tentPost);
    return reply
}

export async function getTent(userId: string, tentId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveTent(db_uuid, tentId)
    return reply
}

export async function getAllTents(userId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveAllTents(db_uuid)
    return reply
}

export async function patchTent(userId: String, tentId: String, update: Tent.TentPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateTent(db_uuid,tentId,update)
    return reply
}

export async function deleteTent(userId: String, tentId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteTent(db_uuid, tentId)
    return reply
}