import { generateRandomNumber, generateRandomColor } from "./allFunctions"
import { faker } from "@faker-js/faker"
export const accounts = [{
        bankName: "First Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "House On The Rock - Tithes & Offering"
    },
    {
        bankName: "Access Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "HOTR - Youth Church"
    },
    {
        bankName: "Wema Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "First Fruits & Miscs"
    },
    {
        bankName: "Zenith Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "HOTR Staff Salaries"
    },
    {
        bankName: "Guaranty Trust Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "HOTR - Legal"
    },
    {
        bankName: "United Bank For Africa",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "HOTR - Sports Fund"
    },
    {
        bankName: "Union Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "Building Development"
    },
    {
        bankName: "FCMB",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "Women's Department Account"
    },
    {
        bankName: "Sterling Bank",
        accountNumber: generateRandomNumber(1000000000, 9999999999),
        accountName: "Men's Department Account"
    },
]

export const paymentCategories = [{
        title: "Tithes",
        color: generateRandomColor(),
        type: false,
    },
    {
        title: "Offerings",
        color: generateRandomColor(),
        type: false,
    },
    {
        title: "New Year Seed",
        color: generateRandomColor(),
        type: "range",
        minAmount: generateRandomNumber(38743, 874338486),
        maxAmount: generateRandomNumber(38743, 874338486),
    },
    {
        title: "Building Fund",
        color: generateRandomColor(),
        type: "fixed",
        amount: generateRandomNumber(38743, 874338486),
    },

]

export const users = [{
        username: faker.name.findName().toLowerCase().replace(" ", ""),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: ""
    },
    {
        username: faker.name.findName().toLowerCase().replace(" ", ""),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: ""
    },
    {
        username: faker.name.findName().toLowerCase().replace(" ", ""),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: ""
    },
    {
        username: faker.name.findName().toLowerCase().replace(" ", ""),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: ""
    }
]