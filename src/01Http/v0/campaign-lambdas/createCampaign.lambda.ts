import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { requireAuth } from '../../../auth/v0/require.auth.js';
import { CampaignHttp, CampaignPatch } from '../../../interfaces/campaign.interface.js';
import * as CampaignLogic from '../../../02BusinessLogic/v0/campaign.logic.js'
import { HttpReplyMessage } from '../../../interfaces/responses.interface.js';