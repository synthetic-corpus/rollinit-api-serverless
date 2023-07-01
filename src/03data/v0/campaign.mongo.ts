import { HttpReplyMessage } from '../../interfaces/responses.interface.js'
import { CampaignModel } from './schemas/schema.js'
import { Campaign, CampaignPatch } from "../../interfaces/campaign.interface.js";


export async function createCampaign(campaign: Campaign): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newCampaign = new CampaignModel(campaign)
        await newCampaign.save()
        reply = {code: 201,message: `Campaign ${newCampaign.name} Created!`}
    }catch(e){
        reply = {
            code: 503,
            message: "Internal server side error" 
        }
        console.error(`Could Not Write user to Database \n ${e}`)
    }
    return reply
}

export async function retrieveCampaign(userId: String, CampaignId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const thisCampaign = await CampaignModel.findById(CampaignId)
        if(thisCampaign){
            if (userId === thisCampaign._user_id.toString()){
                reply = {code: 200,message: "retrieved a campaign",data: thisCampaign}
            }else{
                reply = {code: 403,message: "You are not authorized to view this resource!"}
            }
        }else{
            reply = {code: 404,message: "No Campaign found!"}
        }
    }catch(e){
        console.log(`Error on retrieving tent at database layer for tent: ${CampaignId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function retrieveAllCampaigns(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const query = {_user_id: userId}
        const theseCampaigns = await CampaignModel.find(query)
        if(theseCampaigns){
            reply = {code: 202,message: 'Found Campaigns',data: theseCampaigns}
        }else{
            reply = {code: 404,message: "No Campaigns found!",data: []}
        }
    }catch(e){
        console.log(`Error on retrieving Campaigns at database layer for tent: ${userId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function updateCampaign(userId: String, campaignId: String, campaignPatch: CampaignPatch): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    const query = {_id: campaignId,_user_id: userId}
    try{
        const updatedCampaign = await CampaignModel.findOneAndUpdate(query,campaignPatch)
        if (updatedCampaign){
            const data = campaignPatch
            reply = {code:201, message: "Updated Campaign",data: data}
        }else{
            console.log(`Could not find tent: ${campaignId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find tent or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not retrieve Campaign to update: ${campaignId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}

export async function deleteCampaign(userId: String, campaignId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    const query = {_id: campaignId,_user_id: userId}
    try{
        const deletedCampaign = await CampaignModel.findOneAndDelete(query)
        if (deletedCampaign){
            const data = deletedCampaign
            reply = {code:201, message: "Removed Campaign",data: data}
        }else{
            console.log(`Could not find Campaign: ${campaignId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find tent or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not Delete campaign: ${campaignId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}