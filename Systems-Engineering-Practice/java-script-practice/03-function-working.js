/* ===================== FUNCTION INVOCATION =====================

   Function Invocation:
   - Means calling or executing a function
   - Uses parentheses: ()

   Difference:
   - fn   → function reference
   - fn() → function invocation

================================================================ */


/* ===================== WHAT HAPPENS ON INVOCATION =====================

   When a function is invoked:

   1) A new Execution Context is created
   2) It is pushed onto the Call Stack
   3) Parameters receive values from arguments
   4) Function body executes line by line
   5) A return value is sent back (or undefined)
   6) Function Execution Context is popped from the Call Stack

================================================================ */


/* ===================== BASIC EXAMPLE ===================== */

/*
function square(num) {
  return num * num;
}

square        → function reference
square()      → function invocation

square(4);    → returns 16
square(10);   → returns 100

console.log(square(4));
console.log(square(10));
*/


/* ===================== SCOPE + INVOCATION EXAMPLE ===================== */

var x = 1;
/*
  Global variable:
  - Lives in Global Execution Context
*/

a();   /* Works due to function hoisting */
b();   /* Works due to function hoisting */

console.log(x);
/*
  Scope lookup:
  - JS looks for x in Global scope
  - x = 1 → printed
*/


/* ===================== FUNCTION a() ===================== */

function a() {
  /*
    Local Execution Context for a() is created
    Local scope shadows global variables
  */
  var x = 10;
  console.log(x);
  /*
    Scope lookup:
    - Found in local scope of a()
    - x = 10 → printed
  */
}
/*
  After a() finishes:
  - Its Execution Context is popped
  - Local variables (x = 10) are destroyed
*/


/* ===================== FUNCTION b() ===================== */

function b() {
  /*
    New Local Execution Context for b()
  */
  var x = 100;
  console.log(x);
  /*
    Scope lookup:
    - Found in local scope of b()
    - x = 100 → printed
  */
}
/*
  After b() finishes:
  - Its Execution Context is popped
  - Local variables (x = 100) are destroyed
*/


/* ===================== CALL STACK & EXECUTION FLOW =====================

   1) Global Execution Context (GEC)
      - Created first
      - Pushed onto Call Stack
      - Functions a() and b() are hoisted
      - Global variable x = 1

   2) a() Invocation
      - Local Execution Context for a() created
      - Pushed onto Call Stack
      - Local x = 10
      - console.log → 10
      - a() finishes → popped

   3) b() Invocation
      - Local Execution Context for b() created
      - Pushed onto Call Stack
      - Local x = 100
      - console.log → 100
      - b() finishes → popped

   4) Back to Global Execution Context
      - console.log(x) → 1
      - GEC remains until program ends

================================================================ */


/* ===================== FINAL OUTPUT =====================

   10
   100
   1

================================================================ */


/* ===================== INTERVIEW TAKEAWAYS =====================

   - Each function call creates a new Execution Context
   - Local variables shadow global variables
   - Execution Contexts are managed using Call Stack
   - After function execution, local memory is cleared
   - Global Execution Context lives till program ends

================================================================ */
