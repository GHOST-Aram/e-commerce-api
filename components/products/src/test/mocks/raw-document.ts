export const productData = {
    name: "Samsung galaxy A10S",
    image_url: "https://images/phones/galaxyA10s",
    description: 'Best smartphone in town. Scholing '+
        'is hard and sometin sa dahskdjas fkasijj f asjfaso'+
        ' asjfosj sjafjoasjjf asjoas fajoasj',
    brand: 'galaxy',
    manufacturer: 'Samsung',
    model: 'a10s',
    category: 'smartphone',
    selling_price: 10000,
    marked_price: 10299,
    available_units: 28, 
    specifications:[
        'black', '6 inch', 
        'display', '3g net',
            'bluetooth'
    ],  
}

export const badData = {
    name: 90,
    image_url: 'path',
    description: 'Best smartphone in town. Scholing '+
        'is hard and sometin sa dahskdjas fkasijj f '+
        'asjfaso asjfosj sjafjoasjjf asjoas fajoasj',
    brand: '',
    manufacturer: 'Samsung',
    model: 'a10s',
    category: 'smartphone',
    selling_price: 10000,
    marked_price: 10299,
    availabile_units: 28, 
    specifications: [
        'black', '6 inch', 
        'display', '3g net',
            'bluetooth'
    ],
}

export const partialData = {
    model: 'a10s',
    category: 'smartphone',
    selling_price: 10000,
    marked_price: 10299,
}

export const badPartialData = {
    model: 'a10s',
    category: '',
    selling_price: -12,
    marked_price: 0,
}