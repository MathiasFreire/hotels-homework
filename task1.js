export function firstLetterToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function correctPunctuation(str) {
    let strArr = Array.from(str);

    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === "," || strArr[i] === "." || strArr[i] === "!" ||
            strArr[i] === "?" || strArr[i] === ":" || strArr[i] === ";") {

            if (strArr[i - 1] === " ") {
                strArr.splice(i - 1, 1);
            }

            if (i !== strArr.length - 1 && strArr[i + 1] !== " " || strArr[i] !== " ") {
                strArr.splice(i, 0, " ");
            }

        }

        if (strArr[i] === " " && strArr[i + 1] === " " && i !== strArr.length - 1 || strArr[strArr.length - 1] === " ") {
            strArr.splice(i, 1);
            i--;
        }
    }

    return strArr.join("");
}

export function countWords(str) {
    let arrCount = str.split(" ");

    return arrCount.length;
}

export function uniqueWords(str) {
    let uniqWordsArr = str.toLowerCase().split(" ");

    for (let i = 0; i < uniqWordsArr.length; i++) {
        let item = uniqWordsArr[i].at(uniqWordsArr[i].length - 1);
        if (item === "." || item === "," || item === "!"
            || item === "?" || item === ":" || item === ";") {
            uniqWordsArr[i] = uniqWordsArr[i].slice(0, uniqWordsArr[i].length - 1);
        }
    }

    let mapWords = new Map();

    for (let word of uniqWordsArr) {
        if (mapWords.has(word)) {
            mapWords.set(word, mapWords.get(word) + 1);
        } else {
            mapWords.set(word, 1);
        }
    }
    let res = "";
    for (let word of mapWords.keys()) {
        res += `${word} -- ${mapWords.get(word)}\n`
    }
    return res;
}