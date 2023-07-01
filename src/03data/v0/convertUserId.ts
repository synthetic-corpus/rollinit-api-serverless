import { UserModel } from "./schemas/schema.js";

export async function convertUserId(userId: String): Promise<string>{
    try{
        const mongoUser = await UserModel.findOne({_authID: userId}).exec()
        console.log("converter tool: mongo Searched with: ",userId)
        console.log("converter tool: mongo found: ",mongoUser)
        return mongoUser._id.toString()
    }catch(e){
        console.error(`Could Not Convert an ID! ${e}`)
        return ''
    }
}