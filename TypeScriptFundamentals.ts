// Basics

/*
  Let's begin with a couple of very basic examples.
*/

const a: string = "foo";
const b = 1;
const c = false;
const d = [1, 2, 3];
const e = ["a", "b", "c"];
const f = { id: 1 };
const g = null;
const h = undefined;

/*
  TypeScript offers a number of types.
  To get a quick overview, let's be explicit and define types for the above constants.
  `const a : string = "foo"` (ok)
  ---------------------------------------------------------------------
  `const a : number = "foo"` (error)
  We will get the following error:
  Type '"foo"' is not assignable to type 'number'.
  ---------------------------------------------------------------------
  So assign the type for learning purpoeses. In reality you would rely on type inference.
*/

const aTyped: string = 'foo'
const bTyped: number = 1
const cTyped: boolean = false

/*
  The first three are relatively clear. But how do we type `d`?
*/

const dTyped: number[] = [1, 2, 3]
// or
const dTyped : Array<number> = [1, 2, 3]

const eTyped: Array<string> = ["a", "b", "c"];
const fTyped: Object = { id: 1 };
// or better
const fTyped: { id: number } = { id: 1 };
const gTyped: null = null

/*
  What about undefined?
  In TypeScript you can use the `undefined` type to declare a value as undefined.
  const h : void = undefined
  We will get into more detail as we progress and cover primitives in more detail.
*/

const hTyped : undefined = undefined;

/*
  Let's continue with better understanding the basic types in TypeScript.
  For example the `i` and `j` could either be assigned a primitve type, but interestingly
  a literal type as well. How would that look like?
*/

const i = 2;
const j = "foo";

const iTyped: 2 = 2;
const jTyped: "foo" = "foo";

/*
  Now you might be wondering what value we gain from literal types?
  We can constraint what values we expect.
*/

type ExpectedInput = 1 | 2 | 3

const doSomething = (input: ExpectedInput) => {
  switch (input) {
    case 1:
      return 'Level 1'
    case 2:
      return 'Level 2'
    case 3:
      return 'Level 3'
   }
}

// doSomething(0) // error: This type is incompatible with the expected param type of number enum
// doSomething(1) // ok

/*
  We were dealing with const variables up until now. What about let or var. While
  const variables can't be reassigned, so TypeScript can inter the type and know for sure it will never change.
  This is not the case when working with let or var.
*/

// let aVar: string = "foo";
//
// aVar = 'bar'
//aVar = 1  // Error!

/*
  As we can see in the above example, once you assign a type to a let or var variable any re-assignment
  has to be of that same type otherwise TypeScript will complain.
*/

/*
  Take a look at the following example:
  ---------------------------------------------------------------------
  const i : 3 = 2
  Error: Type '2' is not assignable to Type '3'.
  ---------------------------------------------------------------------
*/

// Any Vs. Unknown

/*
  Sometimes you can't tell what the exact type is or you are currently converting from an existing
  non-typed code base gradually. Here is where `any` and `unknown` are helpful. It's important to note
  that they furfill different puroposes. `any` should be used as a last resort, as it skips type checking.
  In contrast `unknown` is useful when you can't be sure what the input type, as the name alreay implies, is.
  Check the following example:
*/

// const double = (input: unknown) => {
//   if (typeof input === 'string') {
//     return input + ' - ' + input
//   }
//   if (Array.isArray(input)) {
//     return input.concat(input)
//   }
//   return input
// }
//
// const result = double('foo') // ok

/*
  We need to refine the input by checking the type and then returning an appropriate value else the compiler will complain.
  With `any` we completely bypass the type checker. We can pass in any value to `length` and will never receive an error.
  As already mentioned use `any` as a last resort if possible!
*/

// const length = (input: any) => {
//   if (typeof input === "string") {
//     return input.length;
//   }
//
//   if (Array.isArray(input)) {
//     return input.length;
//   }
//
//   return 0;
// };
//
// length("foo");
// length([1, 2, 3, 4]);
// length(1); // no Error!

// Optional Values

/*
  Sometimes we want a certain value to be optional.
  For example take a look at the following function:
*/

// const optionalLength = (input?: string | Array<any>) => {
//   if (typeof input === "string") {
//     return input.length;
//   }
//
//   if (Array.isArray(input)) {
//     return input.length;
//   }
//
//   return false;
// };
//
// optionalLength();
// optionalLength(undefined);
// optionalLength([1, 2, 3, 4]);
// optionalLength("foo");

/*
  As we can see, we can call optionalLength with undefined, an array or a string.
  But as you would expect, passing in a number would cause an error.
*/

// optionalLength(1) // Error!

// Also passing in null will result in an error:

// optionalLength(null); // error! We need to be explicit about null

// To fix this we need to change the type signature to expect null:
// `const optionalLength = (input?: string | Array<any> | null) => {};`

// Functions

/*
  Now that we have covered the very basics, it's time to get more advanced.
  We have already seen a couple of functions in the previous section, but let's take a more
  detailed look at Function types.
  First off all, we would like to type the input and output of a function, so let's see
  how this is done.
*/

// let add = (a: number, b: number) : number => {
//   return a + a
// }
//
// add(2, 2)
// add(2, 'a') // Error!
// const addResult : number = add(2, 2)

/* Try running the follwing: */

// const addResultError : string = add(1, 2)

/*
  You will see the following error:
  ---------------------------------------------------------------------
  Type 'number' is not assignable to type 'string'.
  ---------------------------------------------------------------------
*/

/*
 In case you want to use tradional function declarations as opposed to arrow functions,
 you can write the previous example like so:
*/

// function addFunction(a: number, b: number) : number {
//   return a + a
// }
//
// addFunction(2, 2)
// addFunction(2, 'foo') // Error!
// const addFunctionResult : number = addFunction(2, 2)

/*
  For more information check:
  https://www.typescriptlang.org/docs/handbook/functions.html
*/

// Arrays

/*
  Let's continue with arrays.
  If you recall at the very beginning, we typed a simple array. There are two ways to type an array:
  Array<Type> or Type[].
  So f.e. these two are equivalent:
*/

// const aArray : Array<number> = [1, 2, 3]
// const aArrayShortHand : number[] = [1, 2, 3]

/*
  What if we might have a null value inside our array. The answer is very similar to
  what we have seen in the Optional section. We need to be explicit about null or undefined in this specific case.
*/

// const aOptionalArray: Array<number | null | undefined> = [
//   1,
//   null,
//   2,
//   undefined
// ];
// const aOptionalArrayShortHand: (number | null | undefined)[] = [
//   1,
//   null,
//   2,
//   undefined
// ];

/*
  What if we want to be more specific with our array definition?
  Take the follwing example:
  We have an array consisting of exactly three items, in short a tuple containg a string, a number and another string:
  ['foo', 1, 'bar']
*/

// const tupleA: [string, number, string] = ["foo", 1, "bar"];
// const tupleB: [string, number, number] = ["foo", 1, "bar"]; // Error!

/*
  Another important aspect is that once you have a tuple defined, you can still use any
  of the existing Array methods which mutate the array.
  The compiler will not complain as opposed to Flow, where the compiler would complain.
*/

// tupleA.push("foobar");
// tupleA.push(null); // Error!

/*
  So once you define a tuple you can push any type that exists inside the tuple.
  For example pushing a null into a tuple that expects either string or number results in an error:
  ---------------------------------------------------------------------------------
  Argument of Type 'null' is not assignable to parameter of type 'string | number'.
  ---------------------------------------------------------------------------------
*/

// Let's take a look at traditional arrays next:

// const bArray: Array<number> = [1, 2, 3];
// bArray.push(4);
// bArray.push("foo"); // Error!

/*
  We can see similar results as in the prevous tuple example.
  It's possible to push into an existing array, as long as the types match.
  For example pushing a string "foo" into an array of numbers would result in the following error:
  ---------------------------------------------------------------------------------
  Argument of Type '"foo"' is not assignable to parameter of type 'number'.
  ---------------------------------------------------------------------------------
*/

// Objects

/*
  Next, we will see how TypeScript works with objects.
*/

// const aObject: Object = { id: 1, name: "foo" };
// const bObject: { id: number } = { id: 1, name: "foo" }; // !Error

/*
  `bObject` will casue an error as `name` is not defined. We need to be explicit about the type definition.
  ---------------------------------------------------------------------------------
  Type '{id: number; name: string;}' is not assignable to type '{id: number;}'.
  ---------------------------------------------------------------------------------
*/

// const cObject: { id: number; name: string } = { id: 1, name: "foo" };
// const dObject : {id: number, name: string, points: number} = {id: 1, name: 'foo'} // Error!

/*
  `dObject` will casue an error as points is not defined. We want to make points optional.
  We've already seen how to make a value optional, so let's see how to achieve the same for
  an object property.
*/

// const dRefinedObject : {id: number, name: string, points?: number} = {id: 1, name: 'foo'}

/*
  By declaring `points?: number`, we are saying that points might not be defined.
  To make things more readible, you will probably resort back to defining a type alias
  for the object declaration. This is especially helpful if you also plan to reuse a type definition.
*/

// type E = { id: number; name: string; points?: number };
// const eObject: E = { id: 1, name: "foo" };

/*
  Another important thing to note when working with objects, is that we can not add non existent properties to a defined object.
  Take a look at the following code snippet:
*/

// const fObject = {
//   id: 1
// }
//
// fObject.name = 'foo' // Error!

/*
 Trying to assign `name` to our `fObject` will result in the following error:
 ---------------------------------------------------------------------------------
 Property 'name' does not exist on type {id: number;}.
 ---------------------------------------------------------------------------------
*/

/*
  So the above doesn't work. Per definition we can add new properties to an object with defined properties.
  We need to be more explicit about the types, to be able to make an object expandable.
  We can define a type that expect a key of type string and string property types f.e.
*/
//
// const gObject: { [key: string]: string } = {};
// gObject.name = "foo";

/*
  Another important aspect when working with objects is that we have to be exact with
  our type definition. See the next example:
*/

// type F = {id: number, name: string}
// const fObject : F = {id: 1, name: 'foo', points: 100} // Error!

/*
  But what if wanted can't be exact?
  We can work around having to be exact:
*/

// type G = {id: number, name: string, [key: string]: string | number};
// const gObject : G = {id: 1, name: 'foo', points: 100} // No Error!

/*
  A common approach in JavaScript is to use objects as a map:
*/

// const aMap: { [key: number]: string } = {};
// aMap[1] = "foo";
// aMap["a"] = "foo"; // Error!
// aMap[1] = 1; // Error!

// const otherMap: { [key: string]: number } = {};
// otherMap["foo"] = 1;
// otherMap[1] = 2; // No Error!
// otherMap["bar"] = "foo"; // Error!

/*
  We can also mix property declarations with dynamic key/value pairs, as already shown in a previous example:
*/

// const mixedMap: {
//   id: number;
//   [key: string]: number;
// } = {
//   id: 1
// };
//
// mixedMap["foo"] = 1;
// mixedMap[1] = 2; // No Error!
// mixedMap["bar"] = "foo"; // Error!

// Classes

/*
  In this section will try to understand how classes are typed in TypeScript.
  You can refer to the class itself when typing a class instance.
*/

// class Foo {
//   state = { val: 0 };
//   update(val: number) {
//     this.state = { val };
//   }
//   getVal() {
//     return this.state.val;
//   }
// }
//
// const foobar: Foo = new Foo();

/*
  Class methods and properties can be typed like you would expect.
  Let's update the previous example.
*/

// class Foo {
//   state: { val: number } = { val: 0 };
//   update(val: number): void {
//     this.state = { val };
//   }
//   getVal(): number {
//     return this.state.val;
//   }
// }
//
// const foobar: Foo = new Foo();
//
// foobar.update(3);
// foobar.update("foo"); // Error!
//
// const fooResult: number = foobar.getVal();
// const fooResultError: string = foobar.getVal(); // Error!

/*
  To round things off, let's also take a look at interfaces.
  What if we had a class Bar, that also had a state property and an update function?
*/

// interface Updateable<T> {
//   state: { val: T };
//   update(a: T): void;
// }

// class InterfaceExample implements Updateable<boolean> {
//   state = { val: false };
//   constructor(val: boolean) {
//     this.state = { val };
//   }
//   update(val: boolean) {
//     this.state = { val };
//   }
//   getValue() {
//     return this.state.val;
//   }
// }
//
// const exampleInstance = new InterfaceExample(true);
// const exampleInstanceResultOk: boolean = exampleInstance.getValue();
// const exampleInstanceResultError: number = exampleInstance.getValue(); // Error!

/*
  For more information check:
  https://www.typescriptlang.org/docs/handbook/classes.html
  https://www.typescriptlang.org/docs/handbook/type-inference.html
*/

// Generics

/*
  Now we're getting into more advanced territory here. Up until now we should
  have covered all the necessary basics.
  Let's continue with our previous example and add generics. For example our Example class might als
  accept a string instead of a number. We want to abstract the type definition in this case.
*/

// class Example<T> {
//   state: { val: T };
//   constructor(input: T) {
//     this.state = { val: input };
//   }
//   update(val: T): void {
//     this.state = { val };
//   }
//   getVal(): T {
//     return this.state.val;
//   }
// }
//
// const exampleGenericNumber: Example<number> = new Example(1);
// exampleGenericNumber.update(2);
// const exampleGenericResult: number = exampleGenericNumber.getVal();
//
// const exampleGenericString = new Example("one");
// const exampleGenericResultOther: string = exampleGenericString.getVal();

/*
  If you uncommented the above example you will notice that everything works.
  Interestingly you don't even have to explicity define a type for `const exampleGenericString = new Example('foo')`
  TypeScript will know that our return value is a string, as can be seen in the following line.
  We can do a lot more with generics, like f.e. define type aliases or functions.
  Let's see some examples to get a better idea of the possibilities.
*/

// type ExampleGeneric<T, U> = {
//   one: T;
//   two: U;
// };
//
// const GenericAlias: ExampleGeneric<number, boolean> = {
//   one: 1,
//   two: false
// };
//
// const GenericAliasError: ExampleGeneric<number, boolean> = {
//   one: 1,
//   two: "foo"
// }; //Error!

/*
   Generics with Functions
*/

// const identity = <T>(a: T): T => {
//   return a;
// };

// const doubleIfPossibleResultOne: number = <number>identity(2);
// Optional: We don't need to be specific about the type, TypeScript can infer the argument type.
// const doubleIfPossibleResultOne: number = identity(2);
// const doubleIfPossibleResultTwo: string = identity("foo");
// const doubleIfPossibleResultError: string = identity(true); // Error!

/*
  There is a lot more you can do with generics.
  Consult the official documentation if you are interested in learning more about the topic.
*/

/*
  For more information check:
  https://www.typescriptlang.org/docs/handbook/generics.html
*/

/* Read-only */

/*
  Sometimes we want to make sure that object properties are read-only.
  Take a look at the following example:
*/

// type AB = { a: number; b: string };
//
// const readOnlyNone = (o: AB) => {
//   o.a = 100; // No Error!
//   return o;
// };

/* We can rewrite our `a` propety to `readonly a` and ensure that `a` is read-only now. */

// type ReadOnlyA = { readonly a: number; b: string };
//
// const readOnlyA = (o: ReadOnlyA) => {
//   o.a = 100; // Error!
//   o.b = "test"; // No Error!
//   return o;
// };

/*
  Now if we want to make our object readonly, we can use the built in `Readonly` type.
 */

// type ReadOnlyAB = Readonly<{ a: number, b: string }>;
//
// const readOnlyAB = (o: ReadOnlyAB) => {
//   o.a = 100; // Error!
//   o.b = 'test' // Error!
//   return o
// }

// Intersection

/*
  Sometimes we need to define a type that is a set of other types.
  We can use intersection to combine the types, take the a look at the following example.
*/

// type InterA = { id: number };
// type InterB = { name: string };
// type InterC = { email: string };
//
// type User = InterA & InterB & InterC;
//
// const addUser = (users: Array<User>, user: User): Array<User> => [
//   ...users,
//   user
// ];
// addUser([], { id: 1, name: "user a" }); // Error!
// addUser([], { id: 1, name: "user b", email: "some.email@some.email" });

/*
  We should have a good understanding of the TypeScript basics.
  This tutorial will be updated from time to time.
  If you have any questions or what to extend this tutorial, please connect via Twitter.
*/
