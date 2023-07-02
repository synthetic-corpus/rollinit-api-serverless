import mongoose from 'mongoose'
import { config } from '../../aws.params.js'

const databaseName = 'Mongo Cloud Database'

const uri = `${config.mongoPrefix}${config.mongoUser}:${config.mongoPass}@${config.mongoAddress}`
const myDatabase= mongoose.connect(uri);
    


export {myDatabase, databaseName}