import {Router, Request, Response} from 'express';
import * as TentLogic from '../../02BusinessLogic/v0/tent.logic.js'
import { Tent, TentPatch } from '../../interfaces/tent.interface.js'
import { HttpReplyMessage } from '../../interfaces/responses.interface.js';
import { requireAuth } from '../../auth/v0/require.auth.js';


const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('tent API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const newTent: Tent = req.body
    const reply: HttpReplyMessage = await TentLogic.createTent(user_id,newTent)
    return res.status(reply.code).send(reply)
})

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const tent_id = req.params.id
    const user_id = req.user_id
    const reply: HttpReplyMessage = await TentLogic.getTent(user_id,tent_id)
    return res.status(reply.code).send(reply)
})

router.get('/', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id;
    const reply: HttpReplyMessage = await TentLogic.getAllTents(user_id)
    return res.status(reply.code).send(reply)
})

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user_id
    const patch: TentPatch = req.body
    const reply = await TentLogic.patchTent(user_id,id,patch)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', requireAuth,async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.user_id
    const reply = await TentLogic.deleteTent(user_id,id)
    return res.status(reply.code).send(reply)
})

export const TentRouterV0: Router = router