/* ======================= HOISTING PRACTICE =======================

   Hoisting:
   - JavaScript allocates memory BEFORE executing code
   - This happens in the Memory Creation Phase
   - Execution happens later in the Code Execution Phase

   Important:
   - Hoisting is NOT moving code upward
   - It is about memory allocation before execution

================================================================= */


/* ======================= UNDEFINED vs NOT DEFINED =======================

   undefined:
   - Variable is declared
   - Memory is allocated
   - Value not assigned yet

   not defined:
   - Variable was never declared
   - Accessing it throws ReferenceError

======================================================================== */


/* ---------------------------------------------------------------
   CASE 1: Accessing BEFORE declaration
---------------------------------------------------------------- */

/*
  getName();            ❌ TypeError: getName is not a function
  console.log(x);       → undefined
  console.log(getName); → undefined

  WHY?
  - var x is hoisted and initialized as undefined
  - var getName is hoisted and initialized as undefined
  - Arrow functions behave like variables
  - Function BODY is NOT hoisted for arrow functions
*/


/* ---------------------------------------------------------------
   CASE 2: Variable declaration
---------------------------------------------------------------- */

/*
  Before this line:
  x exists in memory as undefined

  After execution:
  x gets the value 7
*/
var x = 7;


/* ---------------------------------------------------------------
   CASE 3: Arrow function (NOT fully hoisted)
---------------------------------------------------------------- */

/*
  Arrow functions:
  - Stored in variables
  - Hoisted as undefined
  - Cannot be called before initialization
*/
var getName = () => {
  console.log("Hello World");
};

/*
  Now getName points to a function
*/
getName();            /* Hello World */
console.log(x);       /* 7 */
console.log(getName); /* function reference */


/* ---------------------------------------------------------------
   CASE 4: Function declaration (FULLY hoisted)
---------------------------------------------------------------- */

/*
  Function declarations:
  - Fully hoisted
  - Memory stores entire function body
  - Can be called before declaration
*/

function sayHello() {
  console.log("Hello Uday");
}

sayHello();           /* Works even if called earlier */
console.log(sayHello);/* Function definition */


/* ======================= KEY TAKEAWAYS =======================

   Hoisting summary:
   - Hoisting means memory allocation happens before execution;
   - Only function declarations are fully hoisted

   var:
   - Hoisted
   - Initialized as undefined

   function declaration:
   - Fully hoisted
   - Body available in memory

   arrow function / function expression:
   - Hoisted as undefined
   - Acts like a variable

   Accessing undeclared variable:
   - ReferenceError

================================================================ */
