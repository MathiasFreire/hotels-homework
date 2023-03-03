export function sum(a, b) {

    if (b[0] === "-" && a[0] === "-") {
        return "-" + sum(a.slice(1), b.slice(1));
    }

    let diff = Math.abs(a.length - b.length);

    for (let i = 0; i < diff; i++) {
        if (a.length < b.length) a = "0" + a;
        else b = "0" + b;
    }

    let res = "";
    let shift = 0;

    while (a.length !== 0) {
        let sum = +a[a.length - 1] + +b[b.length - 1] + shift;

        if (a.length === 1) {
            res = sum + res;
            break;
        }

        res = sum % 10 + res;
        shift = Math.floor(sum / 10);

        a = a.slice(0, a.length - 1);
        b = b.slice(0, b.length - 1);
    }
    return res;
}

export function diff(a, b) {

    if (a[0] === "-" && b[0] !== "-") {
        return "-" + sum(a.slice(1), b);
    }

    if (b[0] === "-" && a[0] !== "-") {
        return sum(a, b.slice(1));
    }

    if (b[0] === "-" && a[0] === "-") {
        return diff(a.slice(1), b.slice(1));
    }

    let difference = Math.abs(a.length - b.length);

    for (let i = 0; i < difference; i++) {
        if (a.length < b.length) a = "0" + a;
        else b = "0" + b;
    }

    let sign = "";

    if (a[0] < b[0] && a.length <= b.length) {
        let buff = a;
        a = b;
        b = buff;
        sign = "-";
    }

    let res = "";
    let shift = 0;

    while (a.length !== 0) {
        let subtraction = +a[a.length - 1] - +b[b.length - 1] + shift;

        if (subtraction < 0) {
            subtraction += 10;
            shift = -1;
        } else {
            shift = 0;
        }
        res = subtraction + res;

        a = a.slice(0, a.length - 1);
        b = b.slice(0, b.length - 1);
    }

    let counter = 0;

    for (let i = 0; i <= res.length - 1; i++) {
        if (res[i] === "0") {
            counter++;
        } else {
            break;
        }
    }

    return sign + res.slice(counter);
}

function miniMul(a, b) {
    let res = "";
    b = +b;
    let shift = 0;
    for (let i = a.length - 1; i >= 0; i--) {
        let curMul = +a[i] * b + shift;

        if (i === 0) {
            res = curMul + res;
            break;
        }

        res = curMul % 10 + res;
        shift = Math.floor(curMul / 10);
    }
    return res;
}

export function mul(a, b) {
    if (a[0] < b[0] && a.length <= b.length) {
        let buff = a;
        a = b;
        b = buff;
    }

    let res = "";
    let tenMul = "";

    for (let i = b.length - 1; i >= 0; i--) {
        res = sum(res, miniMul(a, +b[i]) + tenMul);
        tenMul += "0";
    }
    return res;
}

export function div(a, b) {

    function rounding(num1, num2) {
        let difference = Math.abs(num1.length - num2.length);
        if (difference > 6) return "00000..."

        let round1 = num1.slice(0, 6);
        let round2 = num2.slice(0, 6 + difference);

        if (round1 === round2) return "99999..."

        return (+round1 / +round2).toString().slice(2, 7) + "...";
    }


    if (a.length < b.length || (a.length === b.length && a < b)) {
        return 0 + "." + rounding(a, b);
    }

    let res = "";
    let curDiff = "";
    let coefficient = 1;

    let curStr = a.slice(0, b.length);

    while (true) {
        curDiff = diff(curStr, miniMul(b, coefficient.toString()));

        if (curStr.length < b.length || (curStr.length === b.length && curStr < b)) {
            curStr += a[curStr.length];
            continue;
        }

        if (curDiff.length < b.length ||
            (curDiff.length === b.length && curDiff < b)) {
            res += coefficient;
            break;
        } else {
            coefficient++;
        }
    }

    for (let i = curStr.length; i < a.length; i++) {
        coefficient = 1;
        curStr = curDiff + a[i];
        if (curStr.length < b.length ||
            (curStr.length === b.length && curStr < b)) {
            res += "0";
            continue;
        }
        curDiff = diff(curStr, miniMul(b, coefficient.toString()));
        while (curDiff.length > b.length || (curDiff.length === b.length && curDiff >= b)) {
            coefficient++;
            curDiff = diff(curStr, miniMul(b, coefficient.toString()));
        }
        if (diff(curStr, miniMul(b, coefficient.toString())) === "0") {
            curDiff = 0;
        }
        res += coefficient;
    }

    if (curDiff === "") return res;

    return res + "." + rounding(curDiff, b);

}