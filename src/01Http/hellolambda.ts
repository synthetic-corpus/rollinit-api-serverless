import 'source-map-support/register'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode:200,
        body: JSON.stringify({
            originalRequest: event,
            message: "hello world without authentication"
        })
    }
}

//export const handler = middy().use(cors()).handler(helloHandler)