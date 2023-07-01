import express from 'express';
import path from 'path';
const cors = require('cors');
import { config } from './config';
import { Request, Response } from 'express';
import { CampaignRouterV0 } from './01Http/v0/campaign.router';
import { FeywildRouterV0 } from './01Http/v0/feywild.router';
import { HarptosRouterV0 } from './01Http/v0/harptos.router';
import { UserRouterV0 } from './01Http/v0/user.router';
import { EncounterRouterV0 } from './01Http/v0/encounter.router';
import { TentRouterV0 } from './01Http/v0/tent.router';


// Database connection derived from DB Layers for decoupling practes
import { myDatabase, databaseName } from './03data/v0/database'

myDatabase.then(
    () =>{console.log(`Connected to Database. Currently using: ${databaseName}`)}
)

const app = express()
const port = config.port

app.use(express.json())

/* Make way for the Routers */
app.use(cors())
// app.use('/v0/feywild', FeywildRouterV0)
// app.use('/v0/harptos', HarptosRouterV0)
app.use('/v0/campaign', CampaignRouterV0)
app.use('/v0/user',UserRouterV0)
app.use('/v0/encounter',EncounterRouterV0)
app.use('/v0/tent',TentRouterV0)

app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Root of API is up');
})

/* Static Paths for Angular */
app.use('/',express.static(path.join(__dirname,'angular')))
app.use('/home',express.static(path.join(__dirname,'angular')))
app.use('/encounters',express.static(path.join(__dirname,'angular')))
app.use('/tents',express.static(path.join(__dirname,'angular')))
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'angular'));
})
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
    console.log(`press CTRL+C to stop server`)
})