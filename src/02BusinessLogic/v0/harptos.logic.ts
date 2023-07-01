import * as Harptos from '../../interfaces/harptos.interface';
import * as DB from '../../03data/v0/harptos.mongo';
import { convertUserId } from '../../03data/v0/convertUserId';
import { HttpReplyMessage } from '../../interfaces/responses.interface'

export async function createHarptos(userId: string, harptosPost: Harptos.HarptosCalendarHttp): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const post: Harptos.HarptosCalendar = {
        _user_id: db_uuid,
        ...harptosPost
    }
    const reply: HttpReplyMessage = await DB.createHarptos(post);
    return reply
}

export async function getHarptos(userId: string, harptosId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveHarptos(db_uuid, harptosId)
    return reply
}

export async function getAllHarptos(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveAllHarptos(db_uuid)
    return reply
}

export async function updateHarptos(userId: String, harptosId: String, harptosPatch: Harptos.HarptosUpdate): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateHarptos(db_uuid,harptosId,harptosPatch)
    return reply
}

export async function deleteHarptos(userId: String, harptosId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteHarptos(db_uuid, harptosId)
    return reply
}