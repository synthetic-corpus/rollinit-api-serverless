import { Request } from 'express'
import * as jsonwbt from 'jsonwebtoken'
import { JwtPayload, Jwt } from '../interfaces.js'
import { config } from '../../aws.params.js'
import Axios from 'axios'


const decode = jsonwbt.decode
const verify = jsonwbt.verify


export function getUserId(req: Request): string | undefined {
    const authorization = req.headers.authorization as string
    if(authorization){
        console.log(authorization)
        const split: string[] = authorization.split(/[ %,]+/)
        const jwtToken = split[1].replace('"','')
        return parseUserId(jwtToken)
    }
}

export function parseUserId(jwtToken: string): string {
    //console.log("parsing user id with...",jwtToken)
    const decodedJwt = decode(jwtToken) as JwtPayload
    console.log("paresed user id payload as....",decodedJwt.sub)
    return decodedJwt.sub
  }

export async function verifyToken(authHeader: string): Promise<JwtPayload> {
    const token = getToken(authHeader)
    //console.log("The token I got was.... ",token)
    const jwt: Jwt = decode(token, { complete: true }) as Jwt
    //console.log("I tried to decode and got ",jwt)
    const rawCert: string = await matchToKey(jwt.header.kid)
    const cert = stringToPEM(rawCert)
    return verify(token, cert, { algorithms: ['RS256']}) as JwtPayload
  }
  
  function getToken(authHeader: string): string {
    //console.log(authHeader)
    if (!authHeader) throw new Error('No authentication header')
  
    if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')
    const split = authHeader.split(/[ ,]+/)
    const token = split[1].replace('"','')
    console.log("Get Token gets ",token)
    return token
  }
  
  async function matchToKey(kid: any): Promise<string> {
    try{
      const actualKeys = await Axios.get(config.authUrl)
      const signerKey = actualKeys.data.keys.filter((key: { [x: string]: string }) => {key[kid] === kid})[0] || actualKeys.data.keys[0]
      const x5cKey: string = signerKey.x5c[0]
      if(!x5cKey){
        throw new Error(`Unable to Match any Keys. x5cKey not extracted.`)
      }
  
      return x5cKey
    }catch(e){
      return ''
    }
    
  }
  
  function stringToPEM(cert: string): string {
    // @ts-ignore: Object is possibly 'null'
    const newCert: string = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${newCert}\n-----END CERTIFICATE-----\n`;
    return cert;
  }