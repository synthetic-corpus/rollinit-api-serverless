import {Router, Request, Response} from 'express';
import { getUserId } from '../../auth/v0/authUtils.js';
import * as UserLogic from '../../02BusinessLogic/v0/user.logic.js'
import { HttpReplyMessage } from '../../interfaces/responses.interface.js';
import { stringify } from 'querystring';
import { requireAuth } from '../../auth/v0/require.auth.js';
import { UserPatch,UserHttp } from '../../interfaces/user.interface.js';

const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Users API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const id = getUserId(req) || ''
    const userHttp: UserHttp = req.body
    console.log("User Name: ", userHttp.name)
    console.log("user id: ",id)
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    UserLogic.createUser(id,userHttp.name)
        .then((reply: HttpReplyMessage)=>{
            const status: number = reply.code || 500
            return res.status(status).send(reply)
        })
})

router.get('/self', requireAuth, async (req: Request, res: Response) => {
    const id = getUserId(req) || ''
    console.log("user id: ",id)
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    UserLogic.getUser(id)
        .then((reply: HttpReplyMessage)=>{
            const status: number = reply.code || 500
            
            return res.status(status).send(reply)
        })
})

router.patch('/self', requireAuth, async (req: Request, res: Response) => {
    const id = getUserId(req) || ''
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    const patch = req.body
    UserLogic.patchUser(id,patch)
        .then((reply: HttpReplyMessage)=>{
            const status: number = reply.code || 500
            return res.status(status).send(reply)
        })
})

router.delete('/self', requireAuth, async (req: Request, res: Response) => {
    const id = getUserId(req) || ''
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    UserLogic.deleteUser(id)
        .then((reply: HttpReplyMessage)=>{
            const status: number = reply.code || 500
            return res.status(status).send(reply)
        })
})

export const UserRouterV0: Router = router