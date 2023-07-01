
async function getParams(location: string) {
    try {
        const config = await import(location)
        console.log("Loading paramaters from config.js. This expected in local DEV environments.")
        return config
    }catch(e){
        console.log("Local config not found. This is expected whe running from AWS.")
        console.log("Parameters expected to be loaded via AWS.")
        return {} // Empty Object means exported config file will not be used.
    }
}

const config: any =  await getParams('./config.js')

if(!config){
    // Load the variables from AWS Paramater store instead.
}

export {config}