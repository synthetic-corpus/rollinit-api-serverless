import {Router, Request, Response} from 'express';
import * as FeywildLogic from '../../02BusinessLogic/v0/feywild.logic'
import { FeywildCalendarHttp, FeywildUpdate } from '../../interfaces/feywild.interface';
import { HttpReplyMessage } from '../../interfaces/responses.interface';

const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Feywild API is up');
})

router.post('/', async (req: Request, res: Response) => {
    const user_id: string = req.user_id;
    const post: FeywildCalendarHttp = req.body
    const reply: HttpReplyMessage = await FeywildLogic.createFeywild(user_id,post)
    return res.status(reply.code).send(reply)
})

router.get('/:id', async (req: Request, res: Response) => {
    const user_id: string = req.user_id
    const feywild_id: string = req.params.id
    const reply: HttpReplyMessage = await FeywildLogic.getFeywild(user_id,feywild_id)
    return res.status(reply.code).send(reply)
})

router.get('/', async (req: Request, res: Response) => {
    const user_id = req.user_id
    const reply: HttpReplyMessage = await FeywildLogic.getAllFeywild(user_id)
    return res.status(reply.code).send(reply)
})

router.patch('/:id', async (req: Request, res: Response) => {
    const feywild_id: string = req.params.id
    const user_id = req.user_id
    const feywild_patch: FeywildUpdate = req.body
    const reply = await FeywildLogic.updateFeywild(user_id,feywild_id,feywild_patch)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const feywild_id = req.params.id
    const user_id = req.user_id
    const reply: HttpReplyMessage = await FeywildLogic.deleteFeywild(user_id,feywild_id)
    return res.status(reply.code).send(reply)
})

export const FeywildRouterV0: Router = router