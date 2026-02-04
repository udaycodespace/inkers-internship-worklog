/* ==============================
   UNDEFINED vs NOT DEFINED
============================== */

/*
  THEORY
  ------

  1) NOT DEFINED:
     - Happens when you try to access a variable
       that has NEVER been declared.
     - JavaScript throws a ReferenceError.
     - The variable does not exist in memory at all.

     Example:
       console.log(y);  // y was never declared

  2) UNDEFINED:
     - Happens when a variable IS declared
       but NO value is assigned yet.
     - JavaScript automatically assigns `undefined`.
     - Memory exists, value does not.

     Example:
       var x;
       console.log(x);  // undefined
*/


/* ==============================
   NOT DEFINED DEMO
============================== */

console.log("=== NOT DEFINED ===");

try {
  console.log(y);   /* y is not declared anywhere */
} catch (err) {
  console.log("Not defined error:", err.message);
  /*
    ReferenceError:
    Variable does not exist in memory
  */
}


/* ==============================
   UNDEFINED DEMO
============================== */

console.log("=== UNDEFINED ===");

var x;                /* Declared but not assigned */
console.log("x initially:", x); /* undefined */

x = 20;               /* Value assigned */

if (x === undefined) {
  console.log("x is undefined");
} else {
  console.log("x is not undefined"); /* This runs */
}


/* ==============================
   JS IS A LOOSELY-TYPED LANGUAGE
============================== */

/*
  THEORY
  ------

  JavaScript is a loosely-typed (dynamic / weakly-typed) language.

  This means:
  - Variables do NOT have fixed types
  - A variable can hold ANY type of value
  - The type can change at runtime

  Same variable → different types at different times
*/


/* ==============================
   LOOSELY-TYPED VARIABLES DEMO
============================== */

console.log("=== LOOSELY-TYPED VARIABLES ===");

var data;                       /* Declared, no value */
console.log("data initially:", data); /* undefined */

data = 10;                      /* number */
console.log("data as number:", data);

data = "Uday";                  /* string */
console.log("data as string:", data);

data = true;                    /* boolean */
console.log("data as boolean:", data);

data = { key: "value" };        /* object */
console.log("data as object:", data);


/* ==============================
   RESULT SUMMARY (LOGICAL)
============================== */

/*
  === NOT DEFINED ===
  ReferenceError: y is not defined

  === UNDEFINED ===
  x initially: undefined
  x is not undefined

  === LOOSELY-TYPED VARIABLES ===
  data initially: undefined
  data as number: 10
  data as string: Uday
  data as boolean: true
  data as object: { key: "value" }
*/


/* ==============================
   ADDITIONAL NOTES (IMPORTANT)
============================== */

/*
   BAD PRACTICE:
  Manually assigning `undefined`
*/

var a = 10;
a = undefined;   /*  Not recommended */
console.log(a);  /* undefined */

/*
  Why this is bad:
  1) Overwrites a valid value accidentally
  2) Makes intent unclear
  3) Looks like a bug, not logic
  4) JS already assigns undefined automatically
*/


/* ==============================
   GOOD PRACTICES
============================== */

/*
  ✔ Correct way to keep a variable undefined
*/
var b;            /* Automatically undefined */
console.log(b);   /* undefined */

/*
  ✔ Use null when you INTENTIONALLY want
    to clear or reset a value
*/
var c = 20;
c = null;         /* Explicitly empty value */
console.log(c);   /* null */


/* ==============================
   INTERVIEW ONE-LINERS
============================== */

/*
  - undefined → declared but not assigned
  - not defined → never declared
  - JavaScript is loosely typed
  - Never assign undefined manually
  - Use null for intentional emptiness
*/
