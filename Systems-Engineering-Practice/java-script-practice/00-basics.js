/* ================================
   0-basic.js
   JavaScript Basics (Beginner Friendly)

   Goal:
   - Learn JS fundamentals clearly
   - Understand *why* things behave the way they do
   - Build strong base before React

   Style:
   - Only comments
   - Theory mixed with examples
================================ */


/* -------- VARIABLES -------- */

/*
  var:
  - Function-scoped (not block-scoped)
  - Hoisted to top of scope
  - Initialized as undefined during hoisting
  - Avoid in modern JS unless legacy code
*/
var a = 10;
console.log(a); /* 10 */

/*
  let:
  - Block-scoped
  - Hoisted but NOT initialized
  - Exists in Temporal Dead Zone (TDZ) until declaration
  - Preferred for variables that change
*/
let b = 20;
console.log(b); /* 20 */

/*
  const:
  - Block-scoped
  - Must be initialized immediately
  - Cannot be reassigned (but objects/arrays can mutate)
  - Default choice in modern JS
*/
const c = 30;
console.log(c); /* 30 */


/* -------- UNDEFINED vs NOT DEFINED -------- */

/*
  Declared but no value assigned → undefined
*/
var x;
console.log(x); /* undefined */

/*
  Never declared at all → ReferenceError (not defined)
*/
// console.log(y); /* ❌ ReferenceError */


/* -------- DATA TYPES -------- */

/*
  JavaScript has dynamic typing
  Type is decided at runtime, not compile time
*/
let num = 100;           /* number */
let str = "Hello";       /* string */
let isActive = true;     /* boolean */
let nothing = null;     /* intentional empty value */
let notAssigned;        /* undefined */

console.log(typeof num);         /* number */
console.log(typeof str);         /* string */
console.log(typeof isActive);    /* boolean */

/*
  typeof null === "object"
  This is a known JavaScript bug kept for backward compatibility
*/
console.log(typeof nothing);     /* object */
console.log(typeof notAssigned); /* undefined */


/* -------- OPERATORS -------- */

/* Arithmetic operators */
console.log(10 + 5); /* addition */
console.log(10 - 5); /* subtraction */
console.log(10 * 5); /* multiplication */
console.log(10 / 5); /* division */

/*
  ==  → loose equality (type coercion allowed)
  === → strict equality (value + type must match)
*/
console.log(5 == "5");   /* true */
console.log(5 === "5");  /* false */


/* -------- IF / ELSE -------- */

/*
  Control flow based on conditions
*/
let votingAge = 18;

if (votingAge >= 18) {
  console.log("Eligible to vote");
} else {
  console.log("Not eligible to vote");
}


/* -------- SWITCH -------- */

/*
  switch is useful when checking
  one value against many cases
*/
let day = 1;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Invalid day");
}


/* -------- LOOPS -------- */

/*
  for loop:
  - Used when number of iterations is known
*/
for (let i = 1; i <= 3; i++) {
  console.log("For loop i =", i);
}

/*
  while loop:
  - Used when condition-based repetition is needed
*/
let count = 1;
while (count <= 3) {
  console.log("While loop count =", count);
  count++;
}


/* -------- FUNCTIONS -------- */

/*
  Function Declaration:
  - Hoisted completely
  - Can be called before definition
*/
function add(p, q) {
  return p + q;
}
console.log(add(2, 3)); /* 5 */

/*
  Function Expression:
  - Stored in variable
  - Not hoisted like declarations
*/
const multiply = function (m, n) {
  return m * n;
};
console.log(multiply(2, 3)); /* 6 */

/*
  Arrow Function:
  - Short syntax
  - No own this / arguments
  - Heavily used in React
*/
const square = (n) => n * n;
console.log(square(4)); /* 16 */


/* -------- ARRAYS -------- */

/*
  Arrays store ordered collections
  Index starts from 0
*/
let arr = [1, 2, 3];
console.log(arr[0]); /* 1 */

/*
  push adds element at end
*/
arr.push(4);
console.log(arr); /* [1, 2, 3, 4] */


/* -------- OBJECTS -------- */

/*
  Objects store key–value pairs
  Used heavily in APIs, React props & state
*/
let user = {
  name: "Uday",
  role: "Learner",
  isActive: true
};

console.log(user.name); /* dot notation */
console.log(user.role);


/* -------- SCOPE -------- */

/*
  Scope defines where variables are accessible
*/
var globalVar = "I am global";

function scopeTest() {
  let localVar = "I am local";
  console.log(globalVar); /* accessible */
  console.log(localVar);  /* accessible */
}

scopeTest();
/* console.log(localVar); ❌ not accessible outside function */


/* -------- HOISTING -------- */

/*
  var declarations are hoisted and initialized as undefined
*/
console.log(hoistedVar); /* undefined */
var hoistedVar = 50;

/*
  let & const are hoisted but stay in TDZ
*/
// console.log(hoistedLet); /* ❌ TDZ error */
let hoistedLet = 60;


/* -------- TRUTHY & FALSY -------- */

/*
  Falsy values:
  false, 0, -0, "", null, undefined, NaN
*/
if (0) {
  console.log("Won't run");
} else {
  console.log("0 is falsy");
}

/*
  Everything else is truthy
*/
if ("hello") {
  console.log("Non-empty strings are truthy");
}


/* -------- TYPE COERCION -------- */

/*
  + prefers string concatenation
*/
console.log("5" + 1); /* "51" */

/*
  -, *, / force numeric conversion
*/
console.log("5" - 1); /* 4 */


/* -------- ARRAY METHODS -------- */

/*
  forEach:
  - Executes function for each element
  - Does NOT return a new array
*/
let nums = [1, 2, 3, 4];
nums.forEach(function (n) {
  console.log("forEach:", n);
});

/*
  map:
  - Transforms data
  - Returns new array
*/
let doubled = nums.map(function (n) {
  return n * 2;
});
console.log(doubled);

/*
  filter:
  - Selects elements based on condition
*/
let evenNums = nums.filter(function (n) {
  return n % 2 === 0;
});
console.log(evenNums);


/* -------- OBJECT DESTRUCTURING -------- */

/*
  Extract values from objects easily
  Very common in React props
*/
let personInfo = {
  name: "Uday",
  age: 22,
  role: "Developer"
};

const { name, age: personAge } = personInfo;
console.log(name);
console.log(personAge);


/* -------- SPREAD OPERATOR -------- */

/*
  Used to copy arrays/objects
  Prevents mutation bugs
*/
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2);

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };
console.log(obj2);


/* -------- STRICT MODE -------- */

/*
  Enforces safer JavaScript
  - No undeclared variables
  - Prevents silent errors
*/
// 'use strict';
// x = 10; /* ❌ ReferenceError */


/* -------- END -------- */

/*
  Covered:
  - var / let / const
  - scope & hoisting
  - data types & coercion
  - control flow
  - loops
  - functions (declaration, expression, arrow)
  - arrays & objects
  - destructuring & spread
  - strict mode

  This file is React-ready JS foundation
*/
