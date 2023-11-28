export const paymentInput = {
    orderId: '64c9e4f2df7cc072af2ac9e8',
    processor: 'M-Pesa',
    amount: 4000,
    receipt_number: 'PTR4K5HD76',
    transaction_date: 20231128102117,
    account_number: 254796699806,
    currency: 'Ksh'
}

export const invalidInput = {
    processor: 'M-Pesa',
    amount: 'Ksh 4000',
    receipt_number: '48972',
    transaction_date: new Date(),
    account_number: '0796699806',
}

export const patchInput = {
    processor: 'M-Pesa',
    amount: 4000,
    receipt_number: 'PTR4K5HD76',
}