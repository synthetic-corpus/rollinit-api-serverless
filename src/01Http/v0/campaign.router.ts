import {Router, Request, Response} from 'express';
import { requireAuth } from '../../auth/v0/require.auth.js';
import { CampaignHttp, CampaignPatch } from '../../interfaces/campaign.interface.js';
import * as CampaignLogic from '../../02BusinessLogic/v0/campaign.logic.js'
import { HttpReplyMessage } from '../../interfaces/responses.interface.js';


const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Campaign API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const post: CampaignHttp = req.body
    const reply: HttpReplyMessage = await CampaignLogic.createCampaign(user_id,post)
    return res.status(reply.code).send(reply);
})

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const campaign_id = req.params.id
    const reply: HttpReplyMessage = await CampaignLogic.getCampaign(user_id,campaign_id);
    return res.status(reply.code).send({reply: `GET ONE is up with ID of ${campaign_id}`, calandar: 'Campaign'})
})

router.get('/', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const reply: HttpReplyMessage = await CampaignLogic.getAllCampaigns(user_id)
    return res.status(reply.code).send(reply);
})

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const user_id = req.user_id
    const campaign_id = req.params.id
    const update: CampaignPatch = req.body
    const reply: HttpReplyMessage = await CampaignLogic.patchCampaign(user_id,campaign_id,update)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', requireAuth,async (req: Request, res: Response) => {
    const user_id = req.user_id
    const campaign_id = req.params.id
    const reply: HttpReplyMessage = await CampaignLogic.deleteCampaign(user_id,campaign_id)
    return res.status(reply.code).send(reply)
})

export const CampaignRouterV0: Router = router