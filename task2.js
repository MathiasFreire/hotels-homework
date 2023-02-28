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

export function mul(a, b) {
    if (a[0] < b[0] && a.length <= b.length) {
        let buff = a;
        a = b;
        b = buff;
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

    let res = "";
    let tenMul = "";

    for (let i = b.length - 1; i >= 0; i--) {
        res = sum(res, miniMul(a, +b[i]) + tenMul);
        tenMul += "0";
    }
    return res;
}

export function div(a, b) {
    let counter = "";

    while (diff(a, b) >= 0) {
        a = diff(a, b);
        counter = sum(counter, "1");
    }

    function rounding(num1, num2) {
        let difference = Math.abs(num1.length - num2.length);

        switch (difference) {
            case 0:
                return "" + (((+num1[0] / +num2[0]).toString().at(2)) || "") + "...";
            case 1:
                return "0" + (((+num1[0] / +num2[0]).toString().at(3)) || "") + "...";
            case 2:
                return "00" + (((+num1[0] / +num2[0]).toString().at(4)) || "") + "...";
            default:
                return "000...";
        }
    }

    return (counter || 0) + "." + rounding(diff(sum(a, b), b), b);
}