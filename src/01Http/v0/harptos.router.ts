import {Router, Request, Response} from 'express';
import { HarptosCalendarHttp, HarptosUpdate } from '../../interfaces/harptos.interface';
import { HttpReplyMessage } from '../../interfaces/responses.interface';
import * as HarptosLogic from '../../02BusinessLogic/v0/harptos.logic'

const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Harptos API is up');
})

router.post('/', async (req: Request, res: Response) => {
    const user_id = req.user_id;
    const post: HarptosCalendarHttp = req.body
    const reply: HttpReplyMessage = await HarptosLogic.createHarptos(user_id,post)
    return res.status(reply.code).send(reply)
})

router.get('/:id', async (req: Request, res: Response) => {
    const user_id = req.user_id
    const harptos_id = req.params.id
    const reply: HttpReplyMessage = await HarptosLogic.getHarptos(user_id,harptos_id)
    return res.status(reply.code).send(reply)
})

router.get('/', async (req: Request, res: Response) => {
    const user_id = req.user_id
    const reply: HttpReplyMessage = await HarptosLogic.getAllHarptos(user_id)
    return res.status(reply.code).send(reply)
})

router.patch('/:id', async (req: Request, res: Response) => {
    const harptos_id = req.params.id
    const user_id = req.user_id
    const harptos_patch: HarptosUpdate = req.body
    const reply: HttpReplyMessage = await HarptosLogic.updateHarptos(user_id,harptos_id,harptos_patch)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const harptos_id = req.params.id
    const user_id = req.user_id
    const reply: HttpReplyMessage = await HarptosLogic.deleteHarptos(user_id,harptos_id)
    return res.status(reply.code).send(reply)
})

export const HarptosRouterV0: Router = router