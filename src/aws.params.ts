export const config = {
    authUrl:  process.env.AUTH_URL || '127.0.0.1',
    port: process.env.API_PORT,
    mongoAddress: process.env.MONGO_ADDRESS,
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASS,
    mongoPrefix: process.env.MONGO_PREFIX
}