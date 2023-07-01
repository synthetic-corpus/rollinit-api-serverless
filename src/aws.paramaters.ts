
export async function getParams() {
    try {
        const config = await import('./config.js')
        console.log("Loading paramaters from config.js. This expected in local DEV environments.")
        return config
    }catch(e){
        console.log("Local config not found. This is expected whe running from AWS.")
        console.log("Parameters expected to be loaded via AWS.")
        // Get values from AWS intead.
        return {} // New Object with values from AWS paramater store
    }
}