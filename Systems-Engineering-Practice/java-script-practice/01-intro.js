/* ===================== JAVASCRIPT EXECUTION OVERVIEW =====================

   Reference (conceptual): JS Execution Context & Call Stack

   Core facts:
   - JavaScript is synchronous
   - JavaScript is single-threaded
   - Executes one statement at a time, in order

   Whenever a JS program runs,
   an Execution Context (EC) is created.

   There are TWO main phases in an Execution Context:
   1) Memory Creation Phase
   2) Code Execution Phase

========================================================================= */


/* ===================== EXECUTION CONTEXT ===================== */

/*
  1) Memory Creation Phase (Variable Environment)
     - Memory space is allocated
     - var variables are initialized as undefined
     - function declarations are stored fully (code + scope)

  2) Code Execution Phase (Thread of Execution)
     - JavaScript executes code line by line
     - Variables get actual values
     - Functions are invoked
*/


/* ===================== CALL STACK ===================== */

/*
  Call Stack manages execution contexts.

  Rules:
  - Global Execution Context (GEC) is created first
  - GEC is pushed into the Call Stack
  - Each function call creates a new Execution Context
  - After function finishes, its EC is popped
  - Stack follows LIFO (Last In, First Out)
*/


/* ===================== CODE EXAMPLE ===================== */

var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var secondSquare = square(n);
var fourthSquare = square(4);

console.log(secondSquare);
console.log(fourthSquare);


/* ===================== STEP-BY-STEP EXECUTION FLOW ===================== */

/*
  STEP 1: Global Execution Context (GEC) is created
  ------------------------------------------------

  Memory Creation Phase:
  ----------------------
  n              -> undefined
  square         -> function definition
  secondSquare   -> undefined
  fourthSquare   -> undefined

  (No code executed yet, only memory allocated)
*/


/*
  STEP 2: Code Execution Phase (Global)
  ------------------------------------

  Line 1:
  n = 2

  Line 2:
  square function already exists in memory

  Line 3:
  square(n) is called
*/


/*
  STEP 3: Function Execution Context (square)
  -------------------------------------------

  A new Execution Context for square() is created
  and pushed onto the Call Stack

  Memory Creation Phase (square EC):
  ---------------------------------
  num -> undefined
  ans -> undefined

  Code Execution Phase (square EC):
  --------------------------------
  num = 2
  ans = 2 * 2 -> 4
  return 4

  square EC is popped from the Call Stack
*/

secondSquare = 4;


/*
  STEP 4: square(4) is called
  --------------------------

  New Execution Context for square() is created

  Memory Creation Phase:
  ----------------------
  num -> undefined
  ans -> undefined

  Code Execution Phase:
  ---------------------
  num = 4
  ans = 4 * 4 -> 16
  return 16

  square EC is popped
*/

fourthSquare = 16;


/*
  STEP 5: console.log execution
  -----------------------------

  console.log(secondSquare) -> 4
  console.log(fourthSquare) -> 16
*/


/* ===================== FINAL OUTPUT ===================== */

/*
  Output:
  4
  16
*/


/* ===================== KEY INTERVIEW TAKEAWAYS ===================== */

/*
  - JavaScript runs code using Execution Contexts
  - Memory phase happens BEFORE execution
  - var is initialized as undefined during memory phase
  - Functions are fully hoisted
  - Call Stack controls order of execution
  - JS is single-threaded but can handle async via Web APIs
*/
