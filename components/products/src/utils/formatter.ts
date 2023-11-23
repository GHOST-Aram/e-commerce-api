export interface PriceRange{
    start: number | null
    end: number | null
}
class Formatter{
    public extractPriceRange = (rangeString: string): PriceRange =>{

        let priceRange: PriceRange = {
            start: null,
            end: null
        }
        const stringArr = rangeString.trim().split('-')
        
        const start = Number(stringArr[0])
        const end = Number(stringArr[1])

        if(typeof start === 'number' && typeof end === 'number'){
            if(start < end){
                priceRange.start = start 
                priceRange.end = end
            } else if( end < start){
                priceRange.start = end
                priceRange.end = start
            }
        }

        return priceRange
    }

    public formatFieldName(fieldName: string): string{
        const formattedName = fieldName.charAt(0)
            .toUpperCase() 
            .concat(fieldName.slice(1))
            .replaceAll(/_/gi, ' ')
        
        return formattedName
    }

    public isValidNameFormat = (name: string) =>{
        return /^[a-zA-Z\s]{2,100}$/.test(name)
    }

    public isValidModelName = (modelName: string) => {
        return /^\w{2,100}/.test(modelName) 
    }
}

export const formatter = new Formatter()