class Formatter{
    public formatFieldName(fieldName: string): string{
        const formattedName = (fieldName.charAt(0).toUpperCase() 
            + fieldName.slice(1)).replaceAll(/_/gi, ' ')
        
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