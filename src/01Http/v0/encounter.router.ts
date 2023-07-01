import {Router, Request, Response} from 'express';
import { requireAuth } from '../../auth/v0/require.auth.js';
import * as EncounterLogic from '../../02BusinessLogic/v0/encounter.logic.js'
import { HttpReplyMessage } from '../../interfaces/responses.interface.js';
import { EncounterHttp,EncounterPatch } from '../../interfaces/encounter.interface.js';


const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('encounter API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const post: EncounterHttp = req.body
    const reply: HttpReplyMessage = await EncounterLogic.createEncounter(user_id,post)
    return res.status(reply.code).send(reply)
})

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user_id
    const reply: HttpReplyMessage = await EncounterLogic.getEncounter(user_id,id)
    return res.status(reply.code).set('Cache-Control','no-store').send(reply)
})

router.get('/', requireAuth, async (req: Request, res: Response) => {
    let search: {_user_id: string, _campaign_id?: string}
    const _campaign_id = req.body.campaign_id || false
    const _user_id = req.user_id
    if (_campaign_id){
        search = {
            _campaign_id,
            _user_id
        } 
    }else{
        search = {
            _user_id
        }
    }
    const reply: HttpReplyMessage = await EncounterLogic.getAllEncounters(search);
    return res.status(reply.code).send(reply)
})

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user_id
    const patch: EncounterPatch = req.body
    const reply = await EncounterLogic.patchEncounter(user_id,id,patch)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', requireAuth,async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user_id
    const reply: HttpReplyMessage = await EncounterLogic.deleteEncounter(user_id,id)
    return res.status(reply.code).send(reply)
})

export const EncounterRouterV0: Router = router