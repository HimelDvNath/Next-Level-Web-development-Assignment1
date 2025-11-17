type ParamType = string | number | boolean;
type FuncType = (param: ParamType) => ParamType;

const formatValue: FuncType = (param) => {
    if (typeof param === "string") {
        return param.toUpperCase();
    } else if (typeof param === "number") {
        return param * 10;
    } else {
        return !param;
    }
};

type InputType = string | any[];

function getLength(param: InputType): number {
    if (typeof param === "string" || Array.isArray(param)) {
        return param.length;
    }
    return 0;
}

class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    getDetails(): string {
        return `'Name: ${this.name}, Age: ${this.age}'`;
    }
}

type bookType = {
    title: string;
    rating: number;
};
function filterByRating(books: bookType[]): bookType[] | string {
    let flag = false;
    const filteredBook: bookType[] = books.filter((book) => {
        if (book.rating >= 0 && book.rating <= 5) {
            if (book.rating >= 4) {
                return book;
            }
        } else {
            flag = true;
        }
    });
    return !flag ? filteredBook : "Wrong input on book rating";
}

type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};
function filterActiveUsers(user: User[]): User[] {
    const filterUser: User[] = user.filter((user) => user.isActive);
    return filterUser;
}

interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}
function printBookDetails(book: Book) {
    const availability = book.isAvailable ? "Yes" : "No";
    console.log(
        `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`
    );
}

function getUniqueValues<T>(array1: T[], array2: T[]): T[] {
    class Node<X> {
        value: X;
        next: Node<X> | null;

        constructor(value: X) {
            this.value = value;
            this.next = null;
        }
    }
    if (array1.length === 0 && array2.length === 0) return [];

    const head = new Node<T>(array1[0]);
    let tail = head;

    for (let value of array1) {
        let current = head;
        let flag = false;

        while (current !== null) {
            if (current.value === value) {
                flag = true;
            }
            current = current.next!;
        }
        if (!flag) {
            tail.next = new Node(value);
            tail = tail.next;
        }
    }
    for (let value of array2) {
        let current = head;
        let flag = false;

        while (current !== null) {
            if (current.value === value) {
                flag = true;
            }
            current = current.next!;
        }
        if (!flag) {
            tail.next = new Node(value);
            tail = tail.next;
        }
    }

    const result: T[] = [];
    let node: Node<T> | null = head;
    let index = 0;

    while (node) {
        result[index++] = node.value;
        node = node.next!;
    }

    return result;
}

type ProductType = {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
};
function calculateTotalPrice<T extends ProductType>(products: T[]): number {
    if (!products || products.length === 0) return 0;

    const totalPrice = products.reduce((total: number, current: T) => {
        let productPrice = current.price * current.quantity;

        if (current.discount !== undefined) {
            productPrice -= productPrice * (current.discount / 100);
        }

        return total + productPrice;
    }, 0);

    return totalPrice;
}
