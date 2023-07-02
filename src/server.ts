import express from 'express';
import cors from 'cors'
import { config }from './aws.params.js';
import { Request, Response } from 'express';
import { CampaignRouterV0 } from './01Http/v0/campaign.router.js';
import { UserRouterV0 } from './01Http/v0/user.router.js';
import { EncounterRouterV0 } from './01Http/v0/encounter.router.js';
import { TentRouterV0 } from './01Http/v0/tent.router.js';

// Database connection derived from DB Layers for decoupling practes
//@ts-ignore
import { myDatabase, databaseName } from './03data/v0/database.js'
//@ts-ignore
myDatabase.then(
    () =>{console.log(`Connected to Database. Currently using: ${databaseName}`)}
)

const app = express()
const port = config.port

app.use(express.json())

/* Make way for the Routers */
app.use(cors())
app.use('/v0/campaign', CampaignRouterV0)
app.use('/v0/user',UserRouterV0)
app.use('/v0/encounter',EncounterRouterV0)
app.use('/v0/tent',TentRouterV0)

app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Root of API is up');
})

/* Static Paths for Angular */

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
    console.log(`press CTRL+C to stop server`)
})