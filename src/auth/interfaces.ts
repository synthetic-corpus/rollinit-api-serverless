import { JwtHeader } from 'jsonwebtoken'
export interface jwkskey {
    alg: string
    kty: string
    n: string
    e: string
    kid: string
    x5t: string
    x5c: string[]
  }

  export interface JwtPayload {
    iss: string
    sub: string
    iat: number
    exp: number
  }

  export interface Jwt {
    header: JwtHeader
    payload: JwtPayload
  }