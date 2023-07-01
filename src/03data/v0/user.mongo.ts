import { HttpReplyMessage } from '../../interfaces/responses.interface.js'
import { CampaignModel, UserModel } from './schemas/schema.js'
import { UserPatch } from '../../interfaces/user.interface.js'

export async function createUser(userId: String, name:string): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newUser = new UserModel({_authID: userId, name: name})
        const createdUser = await newUser.save()
        const newCampaign = new CampaignModel({_user_id: createdUser._id, name: 'My Campaign'})
        await newCampaign.save()
        reply = {code: 201,message: "New User Created!"}
    }catch(e){
        reply = {code: 503,message: "Internal server side error" }
        console.error(`Could Not Write user to Database \n ${e}`)
    }
    return reply
}

export async function retrieveUser(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const user = await UserModel.findById(userId).exec()
        if(user){
            reply = {code: 200,message: "Found the user!",data: user}
        }else{
            throw new Error(`No user Found with Id: ${userId}`)
        }
    }catch(e){
        reply= {code: 404,message: "User was not Found!"}
        console.error(`Database Related Error \n ${e}`)
    }
    return reply
}

export async function updateUser(userId: String, userPatch: UserPatch): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(userId,userPatch)
        if (updatedUser){
            const data: UserPatch = {
                name: updatedUser.name,
                tier: updatedUser.tier
            }
            reply = {code: 201,message: "user updated",data: data}
            await updatedUser.save()
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

export async function deleteUser(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if(deletedUser){
            reply = {code: 202,message: "Requested User has been removed!"}
            console.log(`Deleted User _id: ${deletedUser._id}`)
        }else{
            reply = {code: 404,message: "Could not Find user to delete!"}
        }
    }catch(e){
        console.error(`error updating user! \n ${e}`)
        reply = {code: 500,message: "Unable to Delete User!"}
    }
    return reply
}