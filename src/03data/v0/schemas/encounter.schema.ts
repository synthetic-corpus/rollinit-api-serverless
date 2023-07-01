import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const encounterNPC = new mongoose.Schema({
    name: {type: String, required: true},
    initiative: {type: Number, required: true},
    ac: {type: Number},
    notes: {type: String},
    roll_method: {
        type: String,
        default: 'normal',
        enum: {
            values: ['normal','advantage','disadvantage'],
            message: '{VALUE} is not a valid default_roll'
        }
    }
},{_id: false})

const encounterSchema = new mongoose.Schema({
    _user_id: {type: ObjectId, required: true},
    _campaign_id: {type: ObjectId},
    name: {type: String, required: true},
    npcs: {type: [encounterNPC], default: [],madItems: 12, description: "Maximum of 12 Npcs per encounter"}
})

export const EncounterModel = mongoose.model('Encounter',encounterSchema)