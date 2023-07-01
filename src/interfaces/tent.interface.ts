export interface Tent {
    _id?: String,
    _user_id?: String,
    player: String,
    character: String,
    initiative: number,
    spell_dc?: number,
    passive_perception: number,
    ac: number,
    notes?: string,
    roll_method?: string
}

export interface TentPatch {
    player?: String,
    character?: String,
    initiative?: number,
    spell_dc?: number,
    passive_perception?: number,
    ac?: number,
    notes?: string
}