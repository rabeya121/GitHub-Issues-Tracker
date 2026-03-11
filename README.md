1️⃣ What is the difference between var, let, and const?

Ans:Difference between var, let, const
Var:
a.Function scoped (not block scoped)

b.The same variable can be redeclared

c.It can be updated (reassigned)

d.Hoisting occurs (the value is undefined initially)
ex: var num = 23;

Let:
a.Block scoped (works only inside { })

b.Cannot be redeclared

c.Can be updated (reassigned)
ex: let num=21;
Const:
a.Block scoped (works only inside { })

b.Cannot be redeclared

c.Cannot be updated (reassigned)
ex: const num=12;

2️⃣ What is the spread operator (...)?
Ans:  The Spread Operator (...) is a special syntax in JavaScript that allows the elements of an array or the properties of an object to be expanded (spread out) individually.

Simply put, it lets you take all the values inside an array or object and use them somewhere else.

ex:const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2); // [1, 2, 3, 4, 5]

3️⃣ What is the difference between map(), filter(), and forEach()?
AnS: difference between map(), filter(), and forEach()

🔹 map()
map() runs a function on each element of an array and returns a new array.
Ex:
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);

console.log(doubled);

🔹 filter()
filter() creates a new array with the elements that pass a given condition (true).
Ex:const numbers = [1, 2, 3, 4, 5];

const even = numbers.filter(num => num % 2 === 0);

console.log(even);

🔹 forEach()
forEach() runs a function on each element of an array, but it does not return a new array.
Ex:const numbers = [1, 2, 3];

numbers.forEach(num => {
  console.log(num);
});
4️⃣ What is an arrow function?
AnS:Arrow Function is a shorter syntax in JavaScript for writing functions.
It is written using the => symbol and makes the code shorter and easier to read.
ex: const add = (a, b) => {
  return a + b;
};
5️⃣ What are template literals?
Ans:Template Literals are a modern way to write strings in JavaScript using backticks (`).

They allow you to:

*Easily embed variables inside strings

*Write multi-line strings without extra syntax
ex:const name = "Rahim";
const message = `Hello, ${name}!
Welcome to JavaScript.`;

console.log(message);
