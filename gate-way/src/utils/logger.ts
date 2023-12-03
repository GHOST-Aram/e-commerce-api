import logger from "morgan"

export const logEvents = () =>{
    return logger('combined')
}