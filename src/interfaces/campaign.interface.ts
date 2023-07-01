export interface CampaignHttp {
    name: string,
    notes?: string
}

export interface Campaign extends CampaignHttp {
    _user_id: string
}

export interface CampaignPatch {
    name?: string,
    notes?: string
}