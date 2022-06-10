import { generateRandomNumber } from "./allFunctions"
export const transactionsHistoryColumns = [{
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,

    },
    {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true
    },
    {
        name: "Category",
        selector: (row) => row.category,
        sortable: true



    }
]

export const transactionsHistoryData = [{
    amount: generateRandomNumber(10000, 10000000).toLocaleString(),
    date: new Date().toLocaleDateString(),
    status: getTransactionStatus(),
    category: getTransactionCategory()
}, ]



function getTransactionStatus() {
    const randomNumber = generateRandomNumber(0, 3)
    if (randomNumber === 0) {
        return "Failed"
    } else if (randomNumber === 1) {
        return "Success"
    } else if (randomNumber === 2) {
        return "Pending"
    } else if (randomNumber === 3) {
        return "Cancelled"
    } else {
        return "Unknown"
    }
}


function getTransactionCategory() {
    const randomNumber = generateRandomNumber(0, 3)
    if (randomNumber === 0) {
        return "Tithe"
    } else if (randomNumber === 1) {
        return "Offerings"
    } else if (randomNumber === 2) {
        return "New Year Seed"
    } else if (randomNumber === 3) {
        return "Building Fund"
    } else {
        return "Others"
    }
}