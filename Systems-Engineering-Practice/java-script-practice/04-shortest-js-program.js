/* ========================
   EMPTY JS FILE
   → The Shortest JavaScript Program
======================== */

/*
  Even if a JavaScript file is COMPLETELY EMPTY,
  JavaScript still performs important internal steps.
*/


/* ========================
   1) GLOBAL EXECUTION CONTEXT (GEC)
======================== */

/*
  As soon as JS runs:

  A Global Execution Context (GEC) is created.

  GEC has two phases:
  -------------------

  1) Memory Creation Phase
     - Memory is allocated
     - Global variables & functions are hoisted
     - If no code exists → memory is empty

     In BROWSERS:
     - Global Object = window
     - `this` in global scope points to window

  2) Code Execution Phase
     - Code executes line by line
     - Empty file → nothing to execute
*/


/* ========================
   2) CALL STACK
======================== */

/*
  - Global Execution Context is pushed onto Call Stack
  - Each function call creates a Local Execution Context (LEC)
  - LECs are pushed & popped as functions run
  - Finally, GEC remains until program ends
*/


/* ========================
   3) WINDOW OBJECT (BROWSER ONLY)
======================== */

/*
  window:
  - Global object created by browser
  - Represents the browser tab/window
  - Only exists in browser environments (NOT Node.js)

  What window provides:
  - alert()
  - setTimeout()
  - setInterval()
  - document
  - location
  - history
*/


/*
  Global variables declared with `var`
  become properties of window (browser only).
*/

var x = 10;
/*
  window.x === 10  → true (in browser)
*/


/*
  Global function declarations also attach to window.
*/
function sayHi() {
  console.log("Hi");
}
/*
  window.sayHi() → "Hi"
*/


/*
  `this` in global scope (non-strict mode, browser):
*/
console.log(this === window); /* true */


/* ========================
   4) SCOPE LOOKUP RULE
======================== */

/*
  When JS looks for a variable:

  1) Local scope (current function)
  2) Parent / outer scopes
  3) Global scope (window in browser)

  If not found anywhere:
  → ReferenceError
*/


/* ========================
   5) LOCAL EXECUTION CONTEXT (LEC)
======================== */

/*
  - Created when a function is invoked
  - Contains:
      • Local variables
      • Parameters
      • `this`
  - Destroyed after function execution
*/


/* ========================
   SUMMARY (LAYMAN ANALOGY)
======================== */

/*
  - Browser = building
  - window = room
  - Global variables/functions = furniture
  - `this` = pointing to the room
  - Function calls = mini rooms
  - Call Stack = stack of rooms in use

  Even an EMPTY file creates:
  - Global Execution Context
  - Call Stack
  - window object
  - scope lookup rules
*/


/* ========================
   == vs === (IMPORTANT)
======================== */

/*
  ==  (Loose Equality)
  - Compares VALUE only
  - Performs type coercion
*/

console.log(5 == "5"); /* true */
console.log(true == 1); /* true */
console.log(null == undefined); /* true */

/*
  Think:
  "== is friendly, it tries to match types"
*/


/*
  === (Strict Equality)
  - Compares VALUE + TYPE
  - No type conversion
*/

console.log(5 === "5"); /* false */
console.log(true === 1); /* false */
console.log(null === undefined); /* false */

/*
  Think:
  "=== is strict, no compromise"
*/


/*
  Best Practice:
  - Always use ===
  - Use == only when you clearly understand coercion
*/


/* ========================
   GLOBAL vs FUNCTION SCOPE
======================== */

var a = 10;
/*
  Global variable:
  - In browser → attached to window
*/

function b() {
  console.log("Hello World");
  var c = 20;
  /*
    c is function-scoped
    Exists ONLY inside b()
  */
}


/* ========================
   ACCESS TESTS
======================== */

console.log(window.a); /* 10 (browser only) */
console.log(a);        /* 10 */

/*
  console.log(c); --> X ReferenceError
  Reason:
  - c is inside function b()
*/

console.log(b);
/*
  Prints function definition
  Functions are first-class objects
*/

console.log(b());
/*
  Output:
  Hello World
  undefined

  Why?
  - b() executes → prints "Hello World"
  - No return statement
  - Default return → undefined
*/


/* ========================
   INTERVIEW TAKEAWAYS
======================== */

/*
  - Empty JS file still creates GEC
  - window is the global object (browser only)
  - `this` in global scope → window (non-strict)
  - var globals attach to window
  - Local variables die with function execution
  - Prefer === over ==
*/
