/* ==============================
   SCOPE & LEXICAL ENVIRONMENT
============================== */

/*
  STATEMENT
  ---------
  Scope in JavaScript is directly related to the Lexical Environment.
*/


/* ==============================
   DEFINITION (Simple + Technical)
============================== */

/*
  Scope:
  ------
  Scope determines where variables and functions
  can be accessed in a JavaScript program.

  Lexical Environment:
  --------------------
  A Lexical Environment is created whenever
  code is written (lexically declared).

  It consists of:
  1) Environment Record (variables & functions)
  2) Reference to its outer (parent) Lexical Environment

  IMPORTANT RULE:
  ----------------
  JavaScript uses LEXICAL SCOPING
  → Scope is decided by where code is written,
    NOT by where it is called.
*/


/* ==============================
   BASIC EXAMPLE
============================== */

function outer() {
  var outerVar = "I am outside!";

  function inner() {
    var innerVar = "I am inside!";
    console.log(outerVar); /* Accessible via lexical scope */
    console.log(innerVar); /* Accessible within same scope */
  }

  inner();

  /*
    console.log(innerVar); --> X Error
    innerVar is not accessible outside inner()
  */
}

outer();


/* ==============================
   EXPLANATION
============================== */

/*
  - inner() is lexically inside outer()
  - So inner() gets access to outerVar
  - outer() cannot access innerVar
  - Scope depends on declaration location
*/


/* ==============================
   CASE 1: VALID (GLOBAL LOOKUP)
============================== */

function a() {
  console.log(b);
}

var b = 10;
a();

/*
  WHY THIS WORKS:
  ---------------
  - a() is declared in global scope
  - b is also in global scope
  - Scope lookup:
      a() local → not found
      global → b = 10
*/


/* ==============================
   CASE 2: VALID (NESTED LEXICAL SCOPE)
============================== */

function a2() {
  function c() {
    console.log(b);
  }
  c(); /* Function invocation */
}

var b = 10;
a2();

/*
  WHY THIS WORKS:
  ---------------
  - c() is lexically inside a2()
  - b exists in global scope
  - Scope chain:
      c() → a2() → global
*/


/* ==============================
   CASE 3: INVALID (SCOPE VIOLATION)
============================== */

function a3() {
  var b = 10;

  function c() {
    console.log(b);
  }

  c();
}

/*
  console.log(b); --> X ReferenceError
  b is function-scoped inside a3()
*/

a3();

/*
  WHY ERROR OCCURS:
  -----------------
  - b is declared inside a3()
  - Outside code has NO access to a3()'s scope
*/


/* ==============================
   FINAL RUNNING EXAMPLE
============================== */

function aFinal() {
  console.log(b);
}

var b = 10;
aFinal();


/* ==============================
   INTERVIEW TAKEAWAYS
============================== */

/*
  - JavaScript uses lexical scoping
  - Scope is determined at write-time, not run-time
  - Inner functions can access outer variables
  - Outer code cannot access inner variables
  - Scope chain follows lexical nesting order
  - This concept is the base of closures
*/
