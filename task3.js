class Product {
    constructor(name, price, quantity, desc) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = desc;
    }

    static strangeFilter(objArr, str) {
        let arr = str.split("&");
        let res = [];

        if (str.length === 0) {
            return objArr;
        }

        if (objArr.length === 0) {
            return "Вы не создали ни одного товара";
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("-");
        }

        for (let obj of objArr) {
            let counter = 0;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].length === 2) {
                    let prop = arr[i][0];

                    if (arr[i][1].at(0) === "=") {
                        if (+obj[prop] === +arr[i][1].slice(1)) {
                            counter++;
                        }
                    } else if (arr[i][1].at(0) === "<") {
                        if (arr[i][1].at(1) === "=") {
                            if (+obj[prop] <= +arr[i][1].slice(2)) {
                                counter++;
                            }
                        } else {
                            if (+obj[prop] < +arr[i][1].slice(1)) {
                                counter++;
                            }
                        }
                    } else {
                        if (arr[i][1].at(1) === "=") {
                            if (+obj[prop] >= +arr[i][1].slice(2)) {
                                counter++;
                            }
                        } else {
                            if (+obj[prop] > +arr[i][1].slice(1)) {
                                counter++;
                            }
                        }
                    }
                } else if (arr[i].length === 3) {
                    let prop = arr[i][0];

                    if (arr[i][1] === "contains") {
                        if (~obj[prop].indexOf(`${arr[i][2]}`)) {
                            counter++;
                        }
                    } else if (arr[i][1] === "ends") {
                        if (obj[prop].endsWith(arr[i][2])) {
                            counter++;
                        }
                    } else if (arr[i][1] === "starts") {
                        if (obj[prop].startsWith(arr[i][2])) {
                            counter++;
                        }
                    }
                }
            }
            if (counter === arr.length) {
                res.push(obj);
            }
        }
        return res;
    }
}

let product1 = new Product("orange", 100, 1, "tasty");
let product2 = new Product("apple", 150, 1, "sweet");
let product3 = new Product("dress", 1000, 5, "beautiful");
let arr = [product1, product2, product3];
console.log(Product.strangeFilter(arr, "quantity->=0&price-<200"));
console.log(Product.strangeFilter(arr, ""));
console.log(Product.strangeFilter([], "quantity->=0&price-<200"));
