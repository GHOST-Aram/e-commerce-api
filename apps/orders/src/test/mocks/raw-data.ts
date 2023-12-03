
export const orderInput = {
    item: {
        productId: '64c9e4f2df7cc072af2ac9e8',
        name: 'Samsung A10S',
        price: 13000,
        quantity: 4
    },
    placedBy: '87c9e4f2df7cc072af2ac9e8'
}
// items:Item[],
// delivered: boolean
// cancelled: boolean
// pickupStation: string
// ETA: Date
// placedBy: string,
export const invalidOrderInput = {
    item: {
        productId: '64c9e4f2df7',
        name: 'Samsung A10S',
        price: 13000,
    },
    placedBy: '87c9e4f2df7cc07'
}

export const validPatchData = {
    delivered: true,
    cancelled: false,
    pickupStation: 'Suncity',
    ETA: new Date()
}

