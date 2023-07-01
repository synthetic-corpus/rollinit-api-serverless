import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    _authID: { type: String, required: true, unique: true},
    name: { type: String, default: 'player'},
    tier: {type: Number, default: 0}
})

const tentSchema = new mongoose.Schema({
    _user_id: { type: ObjectId, required: true},
    player: { type: String, required: true},
    character: { type: String, required: true},
    initiative: {type: Number, required: true},
    spell_dc: {type: Number},
    passive_perception: {type: Number},
    ac: {type: Number, required: true},
    notes: {type: String},
    roll_method: {
        type: String,
        default: 'normal',
        enum: {
            values: ['normal','advantage','disadvantage'],
            message: '{VALUE} is not a valid default_roll'
        }
    }
})

const campaignSchema = new mongoose.Schema({
    _user_id: { type: ObjectId, required: true},
    name: { type: String, required: true},
    description: { type: String }
})

export const UserModel = mongoose.model('User',userSchema);
export const TentModel = mongoose.model('Tent',tentSchema);
export const CampaignModel = mongoose.model('Campaign',campaignSchema);