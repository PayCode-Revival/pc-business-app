import { api } from "./api"

export const retrievingPlaceholder = (
  <span className="d-flex justify-content-center">
    <div className="spinner-border" role="status"></div>
  </span>
)

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min
}

export function generateRandomColor() {
  let maxVal = 0xffffff // 16777215
  let randomNumber = Math.random() * maxVal
  randomNumber = Math.floor(randomNumber)
  randomNumber = randomNumber.toString(16)
  let randColor = randomNumber.padStart(6, 0)
  return `#${randColor.toUpperCase()}`
}

export function invertHex(hexnum) {
  if (hexnum.length != 6) {
    console.error("Hex color must be six hex numbers in length.")
    return false
  }

  hexnum = hexnum.toUpperCase()
  var splitnum = hexnum.split("")
  var resultnum = ""
  var simplenum = "FEDCBA9876".split("")
  var complexnum = new Array()
  complexnum.A = "5"
  complexnum.B = "4"
  complexnum.C = "3"
  complexnum.D = "2"
  complexnum.E = "1"
  complexnum.F = "0"

  for (i = 0; i < 6; i++) {
    if (!isNaN(splitnum[i])) {
      resultnum += simplenum[splitnum[i]]
    } else if (complexnum[splitnum[i]]) {
      resultnum += complexnum[splitnum[i]]
    } else {
      console.error("Hex colors must only include hex numbers 0-9, and A-F")
      return false
    }
  }

  return resultnum
}

export function greeting() {
  const date = new Date()
  const time = date.getHours()

  if (time < 12) {
    return "Good Morning"
  }
  if (time > 12) {
    return "Good Afternoon"
  }
  if (time == 12) {
    return "It's Mid-day"
  }
}

export async function makeApiRequest(path, callMethod) {
  const businessInfo = await api[callMethod](path)
  return businessInfo.data
}

export function generateLabels(duration = 7) {
  const output = [
    [
      new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date()),
      new Date().toLocaleDateString(),
    ],
  ]
  for (let i = 1; i < duration; i++) {
    let subtractedDate = dayCalculator(i)
    output.push([
      new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        new Date(subtractedDate)
      ),
      new Date(subtractedDate).toLocaleDateString(),
    ])
  }
  return output
}

export function dayCalculator(daysToSubtract) {
  const date = new Date()
  const subtractedDay = date - 1000 * 60 * 60 * 24 * daysToSubtract
  return subtractedDay
}

export function currency(value) {
  return `₦ ${Number(value).toLocaleString()}`
}

export function localeStringHelper(value, isDate = true) {
  return isDate ? new Date(value).toLocaleDateString() : value.toLocaleString()
}

export function getTransactionStatusName(code, transactionStatuses) {
  for (let i = 0; i < transactionStatuses.length; i++) {
    if (code == Number(transactionStatuses[i].id)) {
      return transactionStatuses[i].title
    }
  }
  return "Error"
}

export function getPaymentCategory(code, paymentCategories) {
  for (let i = 0; i < paymentCategories.length; i++) {
    if (code == paymentCategories[i].id) {
      return paymentCategories[i].title
    }
  }
  return "Error"
}

export function capitalizeFirstLetter(str) {
  let strings = str.split(" ")
  return strings
    .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
    .join(" ")
}

export function getBusinessUserRoleName(code, businessUserRoles) {
  for (let i = 0; i < businessUserRoles.length; i++) {
    if (code == Number(businessUserRoles[i].id)) {
      return businessUserRoles[i].title
    }
  }
  return "User"
}

export function capitalizeFirsts(name) {
  const splitName = name.split(" ")
  const namesUpper = []
  for (const n of splitName) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1))
  }
  return namesUpper.join(" ")
}
