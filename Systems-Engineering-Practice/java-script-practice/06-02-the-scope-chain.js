// /* ==========================================================
//    LEXICAL ENVIRONMENT → SCOPE → SCOPE CHAIN → CLOSURE
// ========================================================== */

// /*
//   Lexical Environment:
//   --------------------
//   - Created when code is written (lexically)
//   - Decides what variables/functions are accessible
//   - Contains:
//       1) Local variables/functions
//       2) Reference to its outer lexical environment

//   Scope:
//   ------
//   - Scope is the area where variables/functions are accessible
//   - Scope is determined by the Lexical Environment

//   Scope Chain:
//   ------------
//   - Chain of lexical environments
//   - Used when JavaScript looks up a variable
//   - Lookup order:
//       Local → Outer → Global

//   Closure:
//   --------
//   - A function remembers its lexical scope
//     even after the outer function has finished execution
// */


// /* ==========================================================
//    EXAMPLE 1: GLOBAL SCOPE LOOKUP
// ========================================================== */

// function a() {
//   console.log(b);
//   /*
//     Scope lookup:
//     - Local scope of a() → b not found
//     - Global scope → b = 10
//   */
// }

// var b = 10;
// a();

// /*
//   RESULT:
//   -------
//   10
// */


// /* ==========================================================
//    EXAMPLE 2: NESTED FUNCTION (SCOPE CHAIN)
// ========================================================== */

// function a2() {
//   function c() {
//     console.log(b);
//     /*
//       Scope lookup:
//       - Local scope of c() → not found
//       - Outer scope of a2() → not found
//       - Global scope → b = 10
//     */
//   }

//   c(); /* Function invocation */
// }

// var b = 10;
// a2();

// /*
//   RESULT:
//   -------
//   10
// */


// /* ==========================================================
//    HOW THIS RELATES TO CLOSURE
// ========================================================== */

// /*
//   If function c() were returned instead of called,
//   it would STILL remember its lexical scope.

//   This memory of outer variables is called a CLOSURE.
// */

// function outer() {
//   var x = 100;

//   function inner() {
//     console.log(x);
//   }

//   return inner;
// }

// var closureFn = outer();
// closureFn();

// /*
//   RESULT:
//   -------
//   100

//   WHY?
//   ----
//   - outer() has finished execution
//   - inner() still remembers x
//   - This is closure in action
// */


// /* ==========================================================
//    INTERVIEW TAKEAWAYS
// ========================================================== */

// /*
//   - Lexical Environment decides scope
//   - Scope is determined by code location
//   - Scope Chain is used for variable lookup
//   - Inner functions can access outer variables
//   - Closures preserve lexical scope even after execution
// */

// /*
//   - Lexical environment decides scope; scope chain resolves variables; closure preserves lexical scope even after execution.
// */

function a(){
  console.log(b);
  c();
  function c(){
    console.log(b); 

  }
}
a();
var b=10; 
/*
  Scope Meand where can we access a specific variable / fn in our code
  Wherever Execution Context is created Lexical environement(local memory + lexical environment of it's parent) is also created 

  lexical --> hireacrchy or in-order! 
  Way of finding these is called Scope Chain!
*/

/*
function a(){
  var b=10;
  c();
  function c(){
    console.log(b);

  }
}
a();
*/
