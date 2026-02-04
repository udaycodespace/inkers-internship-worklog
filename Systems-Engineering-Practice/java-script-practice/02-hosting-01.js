/* ===================== FUNCTION REFERENCE vs FUNCTION CALL =====================

   Topic:
   Difference between `fn` and `fn()`

   This is a VERY common JavaScript interview question.

   Core idea:
   - fn   → refers to the function itself (reference)
   - fn() → executes the function and returns its result

=============================================================================== */


/* ===================== CODE EXAMPLE ===================== */

var x = 7;

/*
  Function declaration:
  - Fully hoisted
  - Stored in memory during Memory Creation Phase
*/
function getName() {
  console.log("Hello World");
  /* No return statement → returns undefined by default */
}


/* ===================== fn (FUNCTION REFERENCE) ===================== */

/*
  When we log `getName` WITHOUT parentheses:

  - We are NOT executing the function
  - We are just referencing it
  - JavaScript prints the function definition
*/
console.log(getName);


/* ===================== fn() (FUNCTION CALL) ===================== */

/*
  When we log `getName()` WITH parentheses:

  Execution steps:
  1) getName() is invoked
  2) A new Execution Context is created
  3) "Hello World" is printed
  4) Function reaches end without return
  5) JavaScript returns `undefined`
  6) console.log prints the returned value
*/
console.log(getName());


/* ===================== EXECUTION OUTPUT ===================== */

/*
  Output order:

  Hello World
  undefined
*/


/* ===================== IMPORTANT NOTES ===================== */

/*
  - Every function in JavaScript returns something
  - If no return statement → return value is undefined
  - fn is used when:
      • passing functions as arguments
      • callbacks
      • event handlers
  - fn() is used when:
      • you want to execute the function immediately
*/


/* ===================== INTERVIEW ONE-LINER ===================== */

/*
  fn  → function reference
  fn() → function execution
*/
