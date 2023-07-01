import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const HarptosDay = new mongoose.Schema({
    month: {type: String, required: true},
    dayNumber: {type: String, reqruied: true},
    season: {type: String, required: true}
},{_id: false})

const HarptosSchema = new mongoose.Schema({
    _user_id: {type: ObjectId, required: true},
    _campaign_id: {type: ObjectId},
    currentDay: {type: Number, required: true, default: 0},
    harptosYear: {type: Number, required: true, default: 1489},
    days: HarptosDay
})

export const HarptosModel = mongoose.model('HarptosCalendar',HarptosSchema)