import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const dilation = new mongoose.Schema({
    sides: {type: Number, required: true},
    rolls: {type: Number, required: true},
    add: {type: Number, required: true}
},{_id: false})

const feySegment = new mongoose.Schema({
    astronomics: {type: String, required: true},
    weather: {type: String, reqruied: true},
    notes: {type: String}
},{_id: false})

const FeywildSchema = new mongoose.Schema({
    _user_id: {type: ObjectId, required: true},
    _campaign_id: {type: ObjectId},
    feywildName: {type: String},
    dilation: {type: dilation, required: true},
    currentSegment: {type: Number, required: true, default: 0},
    feySegments: {type: [feySegment], require: true}
})

export const FeywildModel = mongoose.model('FeywildZone',FeywildSchema)