import mongoose from 'mongoose'
import {config} from '../../aws.paramaters.js'
console.log(config)


const uri = `${config.mongoPrefix}${config.mongoUser}:${config.mongoPass}@${config.mongoAddress}`

export const myDatabase= mongoose.connect(uri);
export const databaseName: string = 'Mongo Cloud Database';