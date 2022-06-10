function generateRandomNumber(min, max) {
    return (Math.floor(Math.random() * max) + min)
}

function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function invertHex(hexnum) {
    if (hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for (i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }

    return resultnum;
}

function greeting() {
    const date = new Date();
    const time = date.getHours();

    if (time < 12) {
        return ("Good Morning");
    }
    if (time > 12) {
        return ("Good Afternoon");
    }
    if (time == 12) {
        return ("It's Mid-day");
    }
}

module.exports = { generateRandomNumber, generateRandomColor, invertHex, greeting }