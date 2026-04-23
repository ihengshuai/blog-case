function runApp(appName: string): boolean {
  const appVersion: number = Math.floor(Math.random() * 10);
  console.log("App版本：" + appVersion + " , App名称：" + appName);

  return true;
}

// let username = '小明';
// username = 3;

// let app: number | null = null;

// let appVersion: number = undefined;

// function log(message: string) {
//   console.log(message);
// }
// function log2(message: string): void {
//   console.log(message);
//   return 3;
// }

// let obj: any = { x: 0 };
// obj.x = 2;

// function log(x) {
//   console.log(x);
// }

// let num: string | number;

// (num as number) * 3;

// function useApp(param: unknown) {
//   if (typeof param === "number") {

//     console.log(param * 3);
//   }

//   console.log(param.toLowerCase());
// }

// function useNever(): never {
//   // while(true) {}
//   throw new Error("error");
// }

// 使用never进行类型收窄
// type TV<U> = U extends string ? string : never;
// type T1 = TV<string>;
// type T2 = TV<number>;

// const enum Color {
//   Red,
//   Green = 3,
//   Blue,
// }
// const color: Color = Color.Green;

// let username: 'Tom' = 'Tom';
// username = 'Jenny';
// let bool: true = true;
// bool = false;
// let num: 1 | 3 | 5 = 1;
// num = 2;

// const arr1: number[] = [1, 2, 3];
// const arr2: Array<number> = [1, 2, 3];

// const tuple: [string, number] = ['Tom', 1];
// tuple[1] = 'Jenny';

// interface Person {
//   name: string;
//   age: number;
//   sex?: string;
// }

// const person: Person = { name: 'Tom', age: 1 };
// person.age = 2;

// person.sex;

// interface Person {
//   age: number;
//   [key: string]: string | number;
// }

// interface Car {
//   name: string;
//   type: "car";
//   run(): void;
// }

// interface Benz extends Car {
//   brand: "Benz";
// }

// class BMW implements Car {
//   name: string;
//   type: "car";
//   brand: "BMW";

//   run(): void {
//     console.log('BMW is running');
//   }
// }

// interface Person {
//   name: string;
// }
// interface Person {
//   age: number;
// }
// let person: Person;

// person.

// interface Person { name: string; }
// type Student = Person & { grade: number; };
// type Color = 'red' | 'green' | 'blue';
// type RGB = Color;

// type ReadonlyUser<T> = {
//   [K in keyof T]+?: T[K];
// };

// let user: ReadonlyUser<{ name: string }>;
// user.name = "Tom";
// user.name = "Jenny";

// class Person {
//   static instance: Person;
//   static getInstance(): Person {
//     if (!Person.instance) {
//       Person.instance = new Person();
//     }
//     return Person.instance;
//   }
//   private constructor() {}
// }
// const person = Person.getInstance();

// abstract class Car {
//   name: string;
//   type: 'Car';

//   abstract running(): void;
// }

// abstract class Color {
//   color: string;

//   abstract paint(): void;
// }

// class Benz implements Car, Color {
//   color: string;
//   paint(): void {
//     throw new Error("Method not implemented.");
//   }
//   name: string;
//   type: "Car";
//   brand: 'Benz'
//   running(): void {
//     throw new Error("Method not implemented.");
//   }
// }

// let x: string | number;
// x! * 2;

// (x! as number) * 2;

// <number>x! * 2;

// let obj: { x?: number } = {};

// obj.x += 1;

// obj.x! * 2;

// function functionName<T>(parameter: T): T { return parameter; }
// const api = <T>() => Promise<T>;
// class Person<T> {
//   name: T;
// }
// interface Pair<K, V> {
//   key: K;
//   value: V;
// }
// type Test<T> = T extends number ? string : number;

// interface HasLength {
//   length: number;
// }
// function logLength<T extends HasLength>(value: T): void {
//   console.log(value.length);
// }
// function logStr<T extends string>(value: T): void {
//   console.log(value);
// }

// type Person = {
//   name: string;
//   age: number;
// };

// type ReadonlyPerson = {
//   readonly [Key in keyof Person as `readonly_${Key}`]: Person[Key];
// };

// type Person = {
//   name: string;
//   age: number;
//   location: string;
// };
// type PersonKeys = keyof Person; // "name" | "age" | "location"

// const person = {
//   name: 'Tom',
//   age: 1
// }
// type Person = typeof person;

// // 等价于
// type Person = {
//   name: string;
//   age: number
// }

// type StringOrNumber = string | number;

// let value: StringOrNumber;
// value = "hello"; // 合法
// value = 42;      // 合法
// value = true;    // 非法，因为 boolean 不是 string 或 number

// type Person = {
//   name: string;
//   age: number;
// };

// type Employee = {
//   id: number;
//   department: string;
// };

// type EmployeePerson = Person & Employee;

// const employee: EmployeePerson = {
//   name: "Alice",
//   age: 30,
//   id: 123,
//   department: "Engineering",
// };

// T extends U ? X : Y

// type IsString<T> = T extends string ? true : false;

// type A = IsString<"hello">; // true
// type B = IsString<42>;      // false

// type TypeName<T> = T extends string
//   ? "string"
//   : T extends number
//   ? "number"
//   : T extends boolean
//   ? "boolean"
//   : "unknown";

// type A = TypeName<"hello">; // "string"
// type B = TypeName<42>;      // "number"
// type C = TypeName<true>;    // "boolean"
// type D = TypeName<{}>;      // "unknown"

// type FnReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// type A = FnReturnType<() => string>; // string
// type B = FnReturnType<() => number>; // number

// type ElementType<T> = T extends (infer U)[] ? U : never;

// type A = ElementType<string[]>; // string
// type B = ElementType<number[]>; // number

// type ToArray<T> = [T] extends [any] ? T[] : never;

// type A = ToArray<string | number>; // (string | number)[]

// type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

// type A = Flatten<string[][]>; // string
// type B = Flatten<number[][][]>; // number

// function printValue(value: string | number) {
//   if (typeof value === "string") {
//     console.log(value.toUpperCase()); // 这里 value 是 string 类型
//   } else {
//     console.log(value.toFixed(2)); // 这里 value 是 number 类型
//   }
// }

// class Dog {
//   bark() {
//     console.log("Woof!");
//   }
// }

// class Cat {
//   meow() {
//     console.log("Meow!");
//   }
// }

// function makeSound(animal: Dog | Cat) {
//   if (animal instanceof Dog) {
//     animal.bark(); // 这里 animal 是 Dog 类型
//   } else {
//     animal.meow(); // 这里 animal 是 Cat 类型
//   }
// }

// class Dog {
//   bark() {
//     console.log("Woof!");
//   }
// }

// class Cat {
//   meow() {
//     console.log("Meow!");
//   }
// }

// function makeSound(animal: Dog | Cat) {
//   if ("bark" in animal) {
//     animal.bark(); // 这里 animal 是 Dog 类型，Dog类型有bark方法
//   } else {
//     animal.meow(); // 这里 animal 是 Cat 类型
//   }
// }

// declare const param: string | number;
// (param as string).toUpperCase();
// (<number>param).toFixed();

// interface Fish {
//   swim(): void;
// }

// interface Bird {
//   fly(): void;
// }

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }

// function move(pet: Fish | Bird) {
//   if (isFish(pet)) {
//     pet.swim(); // 这里 pet 是 Fish 类型
//   } else {
//     pet.fly(); // 这里 pet 是 Bird 类型
//   }
// }


// // 1. Partial<T>：将类型 T 的所有属性变为可选
// interface User {
//   name: string;
//   age: number;
// }
// type PartialUser = Partial<User>; // { name?: string; age?: number }

// // 2. Required<T>：将类型 T 的所有属性变为必填
// type RequiredUser = Required<PartialUser>; // { name: string; age: number }

// // 3. Readonly<T>：将类型 T 的所有属性变为只读
// type ReadonlyUser = Readonly<User>; // { readonly name: string; readonly age: number }

// // 4. Record<K, T>：创建一个对象类型，其键为 K，值为 T
// type UserRoles = Record<string, string>; // { [key: string]: string }

// // 5. Pick<T, K>：从类型 T 中选取指定的属性 K
// type UserNameAndAge = Pick<User, "name" | "age">; // { name: string; age: number }

// // 6. Omit<T, K>：从类型 T 中排除指定的属性 K
// type UserWithoutAge = Omit<User, "age">; // { name: string }

// // 7. Exclude<T, U>：从类型 T 中排除可以赋值给 U 的类型
// type T = string | number | boolean;
// type StringOrNumber = Exclude<T, boolean>; // string | number

// // 8. Extract<T, U>：从类型 T 中提取可以赋值给 U 的类型
// type NumberOrBoolean = Extract<T, number | boolean>; // number | boolean

// // 9. NonNullable<T>：从类型 T 中排除 null 和 undefined
// type NonNullableT = NonNullable<string | number | null | undefined>; // string | number

// // 10. ReturnType<T>：获取函数类型 T 的返回值类型
// function getUser() {
//   return { name: "Alice", age: 30 };
// }
// type UserReturnType = ReturnType<typeof getUser>; // { name: string; age: number }

// // 11. Parameters<T>：获取函数类型 T 的参数类型组成的元组
// function add(a: number, b: number) {
//   return a + b;
// }
// type AddParams = Parameters<typeof add>; // [number, number]

// // 12. ConstructorParameters<T>：获取构造函数类型 T 的参数类型组成的元组
// class Person {
//   constructor(public name: string, public age: number) {}
// }
// type PersonParams = ConstructorParameters<typeof Person>; // [string, number]

// // 13. InstanceType<T>：获取构造函数类型 T 的实例类型
// type PersonInstance = InstanceType<typeof Person>; // Person

// // 14. ThisParameterType<T>：获取函数类型 T 的 this 参数类型
// function greet(this: { name: string }) {
//   console.log(`Hello, ${this.name}`);
// }
// type GreetThis = ThisParameterType<typeof greet>; // { name: string }

// // 15. OmitThisParameter<T>：从函数类型 T 中移除 this 参数
// type GreetWithoutThis = OmitThisParameter<typeof greet>; // () => void

// // 16. Awaited<T>：获取 Promise 类型 T 的解析值类型
// type PromiseResult = Awaited<Promise<string>>; // string

// // 17. 字符串操作工具类型
// type Greeting = "hello";
// type UppercaseGreeting = Uppercase<Greeting>; // "HELLO"
// type LowercaseGreeting = Lowercase<UppercaseGreeting>; // "hello"
// type CapitalizedGreeting = Capitalize<Greeting>; // "Hello"
// type UncapitalizedGreeting = Uncapitalize<CapitalizedGreeting>; // "hello"
