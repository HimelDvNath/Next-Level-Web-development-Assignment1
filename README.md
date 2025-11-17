## টাইপস্ক্রিপ্ট বাংলা ব্লগ

## 1. What are some differences between interfaces and types in TypeScript?
উত্তরঃ

## ইন্টারফেস কী?
- TypeScript-এ একটি interface হলো একটি অবজেক্টের জন্য চুক্তি, যা অবজেক্টের কোন প্রপার্টি এবং মেথড থাকবে তা নির্ধারণ করে, কিন্তু বাস্তবায়ন প্রদান করে না।

উদাহরণঃ
```ts
interface Person {
  name: string;
  age: number;
}
```

## টাইপ কী?
- আপনি এই interface ব্যবহার করে নিশ্চিত করতে পারেন যে যেকোনো অবজেক্ট যা আপনি Person হিসেবে ব্যবহার করছেন তার অবশ্যই name এবং age থাকবে।

উদাহরণঃ

একটি অবজেক্টের type alias-এর উদাহরণ
```ts
type Person = {
  name: string;
  age: number;
};
```
কিন্তু type এটিও করতে পারে
```ts
type ID = number | string;
```
এখানে, ID একটি সংখ্যা অথবা একটি স্ট্রিং হতে পারে, যা একটি ইন্টারফেসের মাধ্যমে সম্ভব হবে না।

## মূল পার্থক্যগুলিঃ
- **ফ্লেক্সিবিলিটিঃ**
  Types বেশি versatile। আপনি union (A | B), intersection (A & B), tuple এবং primitive তৈরি করতে পারেন। Interfaces মূলত অবজেক্টের shape বর্ণনা করতে ব্যবহার হয়।

- **ডিক্লারেশন মার্জিংঃ**
  Interfaces ডিক্লারেশন মার্জিং সাপোর্ট করে। একই নামের interface একাধিকবার declare করলে TypeScript তাদের properties একত্রিত করে। Types এ redeclare করা গেলে error দেয়।

- **এক্সটেন্ডিং ও ইমপ্লিমেন্টিংঃ**
  Interfaces এবং Types উভয়ই অন্য interface/type extend করতে পারে।
তবে interfaces ব্যবহার করে inheritance সহজ এবং object-oriented pattern-এ বেশি ব্যবহৃত।
Classes interface implement করে, type নয়।

- **রিডেবিলিটিঃ**
  বড় কোডবেসে object shape বোঝাতে interface বেশি স্পষ্ট এবং readable।
Types বেশি ব্যবহার হয় যখন multiple type combine বা manipulate করতে হয়।

## কখন কোনটি ব্যবহার করবেন?

- **Interface ব্যবহার করবেন:**
  যখন আপনি একটি অবজেক্টের shape নির্ধারণ করতে চান এবং অন্যরা সেই shape extend বা implement করতে পারবে।

- **Type ব্যবহার করবেন:**
যখন আপনাকে complex types যেমন union, intersection তৈরি করতে হবে বা primitive type-এর alias তৈরি করতে হবে।

## 2. What is the use of the keyof keyword in TypeScript? Provide an example?
উত্তরঃ TypeScript-এ keyof keyword ব্যবহার করা হয় একটি অবজেক্ট টাইপের সমস্ত key (property name) বের করতে এবং সেগুলোর একটি union টাইপ তৈরি করতে। এটি বিশেষভাবে type safety নিশ্চিত করতে কাজে আসে, যেমন যখন আপনি অবজেক্টের key dynamically access বা map করেন।

উদাহরণঃ
```ts
interface User {
  name: string;
  age: number;
  email: string;
}
```
আপনি keyof ব্যবহার করে এমন একটি type তৈরি করতে পারেন যা শুধুমাত্র User এর keys অনুমোদন করেঃ
```ts
type UserKeys = keyof User; // This is equivalent to "name" | "age" | "email"
```
এখন, যদি আপনি এমন একটি function লিখতে চান যা নিরাপদভাবে User অবজেক্টের যেকোনো property access করে, তাহলে এটি করতে পারেনঃ
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { name: "Alice", age: 30, email: "alice@example.com" };
console.log(getProperty(user, "name")); // Works: returns "Alice"
console.log(getProperty(user, "phone")); // Error: "phone" is not a key of User
```
এখানে keyof নিশ্চিত করে যে শুধুমাত্র User এর বৈধ property name গুলোই function-এ পাস করা যাবে, যার ফলে আপনার কোড আরও নিরাপদ এবং রক্ষণাবেক্ষণ সহজ হয়।

## 3. Explain the difference between any, unknown, and never types in TypeScript.
উত্তরঃ TypeScript-এ `any`, `unknown`, এবং `never` টাইপের পার্থক্য type safety এবং কোডের সঠিকতার জন্য গুরুত্বপূর্ণ:

- **any:**
  Type checking পুরোপুরি বন্ধ করে দেয়। `any` টাইপের ভেরিয়েবলে যেকোনো মান রাখা যায় এবং যেকোনো অপারেশন করা যায়। এটি TypeScript-কে “trust me” বলার মতো, কিন্তু type safety হারায় এবং bugs তৈরি হতে পারে।

- **unknown:**
  `unknown` হলো `any` এর নিরাপদ বিকল্প। এর ভেরিয়েবল যেকোনো মান রাখতে পারে, কিন্তু এর properties access বা method কল করার আগে type চেক করা বাধ্যতামূলক। এটি explicit type check করতে বাধ্য করে, কোডকে বেশি robust করে এবং invalid operations থেকে রক্ষা করে।

- **never:**
  `never` এমন মানকে বোঝায় যা কখনো ঘটতে পারে না। সাধারণত এমন function-এ ব্যবহৃত হয় যা সবসময় error throw করে বা unreachable code path নির্দেশ করে। `never` টাইপে কোন মান assign করা যায় না, তাই এটি সবচেয়ে restrictive টাইপ।


উদাহরণঃ
```ts
let a: any = 10;
a = "hello";  // OK, no error
a.foo();      // OK at compile time, but may fail at runtime

let b: unknown = 10;
b = "world";  // OK
// b.foo();   // Error: Object is of type 'unknown'.
if (typeof b === "string") {
  b.toUpperCase();  // OK, after type check
}

function error(): never {
  throw new Error("This function never returns");
}

function check(value: string | number) {
  if (typeof value === 'string') {
    // ...
  } else if (typeof value === 'number') {
    // ...
  } else {
    // value has type 'never' here, meaning unreachable code
  }
}
```
যখন মানের টাইপ অজানা থাকে তখন `unknown` ব্যবহার করুন type safety বজায় রাখতে, যতটা সম্ভব `any` এড়িয়ে চলুন, এবং প্রোগ্রামে অসম্ভব পরিস্থিতি পরিচালনার জন্য `never` ব্যবহার করুন। এভাবে TypeScript কোডে type safety এবং predictability সর্বাধিক রাখা যায়।

## 4. What is the use of enums in TypeScript? Provide an example of a numeric and string enum.
উত্তরঃ TypeScript-এ Enums ব্যবহার করা হয় একটি নির্দিষ্ট set এর named constants define করার জন্য। এটি কোডকে বেশি readable এবং maintainable করে, কারণ arbitrary মানের পরিবর্তে অর্থপূর্ণ নাম ব্যবহার করা যায়। Enums সাধারণত numeric বা string-based হতে পারে।

Numeric Enum উদাহরণঃ
Numeric enums ডিফল্টভাবে 0 থেকে শুরু করে এবং প্রতি member এর জন্য 1 করে বৃদ্ধি পায়।
```ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}
```
আপনি numeric মানগুলো explicitly ও define করতে পারেনঃ
```ts
enum StatusCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}
```
String Enum উদাহরণঃ
String enums-এ প্রতিটি member-কে explicitly string value দিতে হয়। এটি readability বাড়ায়, বিশেষ করে যখন প্রকৃত string মান গুরুত্বপূর্ণ হয়।
```ts
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
```

## Enums কেন ব্যবহার করবেন?
- সংক্রান্ত constants কে গোত্রভিত্তিকভাবে গ্রুপ করা এবং অর্থপূর্ণ নাম দেওয়া।
- কোডের readability এবং maintainability বৃদ্ধি করা।
- Hardcoding মান এড়ানো, যা ভুলের সম্ভাবনা কমায়।
- Compiler দ্বারা auto-completion এবং type checking সুবিধা পাওয়া।
- Enums compile হয়ে JavaScript-এ objects হিসেবে আসে, যা runtime-এ efficient এবং সহজে ব্যবহৃত হয়।
  
## 5. Provide an example of using union and intersection types in TypeScript.
উত্তরঃ TypeScript-এ `Union` এবং `Intersection` টাইপগুলো শক্তিশালী উপায় multiple types combine বা compose করার জন্য।

## Union Types
Union type একটি ভেরিয়েবলকে একাধিক টাইপের মধ্যে যেকোনো একটি হতে দেয়। অর্থাৎ, “এটি type A বা type B হতে পারে”।
Union টাইপ define করতে `|` সিম্বল ব্যবহার করা হয়।

উদাহরণঃ
```ts
type Fruit = "Apple" | "Banana" | "Orange";

function eatFruit(fruit: Fruit) {
  console.log(`Eating a ${fruit}`);
}

eatFruit("Apple");   // valid
// eatFruit("Mango"); // error: not in the union
```
Fruit হতে পারে তিনটি string literal এর মধ্যে যেকোনো একটি Apple, Banana, অথবা Orange।

## Intersection Types
Intersection type একাধিক type কে combine করে একটি নতুন type তৈরি করে। এর মানে হলো value টি একসাথে সব type এর শর্ত পূরণ করতে হবে।
Intersection টাইপ define করতে & সিম্বল ব্যবহার করা হয়।

উদাহরণঃ
```ts
type Name = { name: string };
type Age = { age: number };

type Person = Name & Age;

const person: Person = {
  name: "Alice",
  age: 30,
};
```
এই উদাহরণে, Person-এর কাছে উভয়ই name এবং age property থাকতে হবে।
