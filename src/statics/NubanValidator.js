export const ACCOUNT_NUMBER_LENGTH = 10
const BANK_CODE_LENGTH = 3
const NUBAN_KEY = "373373373373"
const allBanks = [
    {
        name: "ACCESS BANK",
        code: "044"
    },
    {
        name: "CITIBANK",
        code: "023"
    },
    {
        name: "DIAMOND BANK",
        code: "063"
    },
    {
        name: "ECOBANK NIGERIA",
        code: "050"
    },
    {
        name: "FIDELITY BANK",
        code: "070"
    },
    {
        name: "FIRST BANK OF NIGERIA",
        code: "011"
    },
    {
        name: "FIRST CITY MONUMENT BANK",
        code: "214"
    },
    {
        name: "GUARANTY TRUST BANK",
        code: "058"
    },
    {
        name: "HERITAGE BANK",
        code: "030"
    },
    {
        name: "JAIZ BANK",
        code: "301"
    },
    {
        name: "KEYSTONE BANK",
        code: "082"
    },
    {
        name: "PROVIDUS BANK",
        code: "101"
    },
    {
        name: "SKYE BANK",
        code: "076"
    },
    {
        name: "STANBIC IBTC BANK",
        code: "221"
    },
    {
        name: "STANDARD CHARTERED BANK",
        code: "068"
    },
    {
        name: "STERLING BANK",
        code: "232"
    },
    {
        name: "SUNTRUST",
        code: "100"
    },
    {
        name: "UNION BANK OF NIGERIA",
        code: "032"
    },
    {
        name: "UNITED BANK FOR AFRICA",
        code: "033"
    },
    {
        name: "UNITY BANK",
        code: "215"
    },
    {
        name: "WEMA BANK",
        code: "035"
    },
    {
        name: "ZENITH BANK",
        code: "057"
    }
]

export class Nuban {

    constructor(accountNumber = null, bankCode = null, bankName = null) {
        // Constructor Variables Declarations
        this.accountNumber = accountNumber
        this.bankCode = bankCode
        this.bankName = bankName


        // // Validate Account Number
        // if (this.accountNumber && this.accountNumber.length !== ACCOUNT_NUMBER_LENGTH) {
        //     throw `Account Number Must Be ${ACCOUNT_NUMBER_LENGTH} Digits In Length`
        // }

        // // Validate Bank Code
        // if (this.bankCode && (typeof this.bankCode !== "string" || String(this.bankCode).length !== BANK_CODE_LENGTH)) {
        //     throw `Bank Code Must Either Be Blank Or Be A String & ${BANK_CODE_LENGTH} Digits In Length`
        // }

        // // Validate Bank Name
        // if (this.name && (typeof this.bankName !== "string")) {
        //     throw `Bank Name Must Either Be Blank Or Be A String`
        // }
    }

    static allBanks() {
        return allBanks
    }

    static allBankNames() {
        return allBanks.map(bank => bank.name)
    }

    static allBankCodes() {
        return allBanks.map(bank => bank.code)
    }

    static bankCode(bankName) {
        const foundBank = allBanks.find(bank => bank.name.toLowerCase() == bankName.toLowerCase())
        return foundBank ? foundBank.code : "No Bank Found"
    }

    static bankName(bankCode) {
        if (typeof bankCode !== "string") {
            return "Bank Code Must Be Provided As A String"
        }

        if (String(bankCode).length !== 3) {
            return `Bank Code Must Be ${BANK_CODE_LENGTH} Digits In Length`
        }

        const foundBank = allBanks.find(bank => bank.code == bankCode)

        return foundBank ? foundBank.name : "No Bank Found"
    }

    static evaluateNuban(accountNumber, bankCode) {

        let j = 0
        let output = 0
        let toAdd
        for (let i = 0; i < ACCOUNT_NUMBER_LENGTH + BANK_CODE_LENGTH; i++) {
            toAdd = i < BANK_CODE_LENGTH ? bankCode[i] : accountNumber[j]
            output += (toAdd ? toAdd : 0) * (NUBAN_KEY[i] ? NUBAN_KEY[i] : 0)
            toAdd === accountNumber[j] && j++
        }
        return output
    }

    static nubanFormula(accountNumberLastDigit, nubanCode) {
        return 10 - (nubanCode % 10) == accountNumberLastDigit
    }

    static possibleBanks(accountNumber) {
        accountNumber = String(accountNumber)
        const output = []
        let bankCode, evaluatedNuban

        // Create Account
        for (let i = 0; i < allBanks.length; i++) {
            bankCode = allBanks[i].code
            evaluatedNuban = this.evaluateNuban(accountNumber, bankCode)
            if (this.nubanFormula(accountNumber[accountNumber.length - 1], evaluatedNuban)) {
                output.push(allBanks[i].name)
            }
        }

        return output
    }

    static validForBankCode(accountNumber, bankCode) {
        accountNumber = String(accountNumber)
        return this.nubanFormula(accountNumber[accountNumber.length - 1], bankCode)
    }

    static validForBankName(accountNumber, bankName) {
        return this.possibleBanks(accountNumber).includes(bankName.toUpperCase())
    }

    getBankCode() {
        return this.constructor.bankCode(this.bankName)
    }

    getPossibleBanks() {
        return this.constructor.possibleBanks(this.accountNumber)
    }

    isValidAccountNumber() {
        return this.getPossibleBanks(this.accountNumber).length > 0
    }

    isValidForBankCode() {
        if (this.bankCode) {
            return this.constructor.validForBankCode(this.accountNumber, this.bankCode)
        }
        return "Bank Code Not Provided"
    }

    isValidForBankName(bankName = null) {
        bankName = bankName ? bankName : this.bankName

        if (bankName) {
            return this.constructor.validForBankName(this.accountNumber, bankName.toUpperCase())
        }
        return "Bank Name Not Provided"
    }

    setAccountNumber(accountNumber) {
        accountNumber = String(accountNumber)
        this.accountNumber = accountNumber
        return true
    }

    setBankCode(bankCode) {
        this.bankCode = bankCode
        return true
    }
}

