import  * as User from '../../interfaces/user.interface.js';
import * as DB from '../../03data/v0/user.mongo.js';
import { convertUserId } from '../../03data/v0/convertUserId.js';
import { HttpReplyMessage } from '../../interfaces/responses.interface.js'


export async function createUser(userId: String, name: string): Promise<HttpReplyMessage>{
    const reply: HttpReplyMessage = await DB.createUser(userId, name);
    return reply
}

export async function getUser(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.retrieveUser(db_uuid)
    console.log("logic layer searches with: ",userId, "which converted to ",db_uuid)
    console.log("logic layer finds: ",reply)
    return reply
}

export async function patchUser(userId: String, update: User.UserPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateUser(db_uuid,update)
    return reply
}

export async function deleteUser(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteUser(db_uuid)
    return reply
}