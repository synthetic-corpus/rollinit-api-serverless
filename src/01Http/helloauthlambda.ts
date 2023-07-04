import 'source-map-support/register'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { requireAuthMiddy } from '../auth/v0/requireAuth.lambda'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const helloAuthHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode:200,
        body: JSON.stringify({
            originalRequest: event,
            message: "hello world *with* authentication"
        })
    }
}

export const handler = middy()
                        .use(cors())
                        .use(requireAuthMiddy())
                        .handler(helloAuthHandler)

handler
  