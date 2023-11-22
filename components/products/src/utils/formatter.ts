class Formatter{
    public formatFieldName(fieldName: string): string{
        const formattedName = (fieldName.charAt(0).toUpperCase() 
            + fieldName.slice(1)).replaceAll(/_/gi, ' ')
        
            return formattedName
    }
}

export const formatter = new Formatter()