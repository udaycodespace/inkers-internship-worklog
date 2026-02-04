/*
============================================
VAR, LET, CONST — ERRORS, DEFINITIONS, EXAMPLES
============================================
*/

/* ================= VAR ================= */

// Definition:
// - Hoisted and initialized with undefined
// - Function/global scoped
// - Can be re-declared and re-assigned
// - No TDZ

// Examples of Errors:
// 1. SyntaxError: Only occurs if duplicate var in strict mode or invalid identifier
// 2. TypeError: Rare for var (usually reassign is allowed)
// 3. ReferenceError: Accessing undeclared var (not hoisted var is ReferenceError)

// Example ReferenceError for undeclared var
try {
    console.log(undeclaredVar); // ReferenceError: undeclaredVar is not defined
} catch(e) { console.log(e.name + ": " + e.message); }

// SyntaxError example (strict mode duplicate declaration)
'use strict';
try {
    var a = 10;
    var a = 20; //  allowed in non-strict mode, SyntaxError in strict mode
} catch(e) { console.log(e.name + ": " + e.message); }

// TypeError example (rare, reassigning allowed)
var b = 5;
b = 10; //  Allowed, no TypeError

/* ================= LET ================= */

// Definition:
// - Block scoped
// - Hoisted but in Temporal Dead Zone (TDZ) until initialization
// - Cannot be redeclared in the same scope
// - Can be reassigned after initialization

// ReferenceError example (TDZ)
try {
    console.log(lt1); // ReferenceError: Cannot access 'lt1' before initialization
} catch(e) { console.log(e.name + ": " + e.message); }
let lt1 = 10;

// SyntaxError example (duplicate declaration)
try {
    let x = 5;
    let x = 6; // SyntaxError: Identifier 'x' has already been declared
} catch(e) { console.log(e.name + ": " + e.message); }

// TypeError example (reassign allowed)
let lt2 = 15;
lt2 = 20; //  No error

/* ================= CONST ================= */

// Definition:
// - Block scoped
// - Hoisted but in TDZ
// - Must be initialized during declaration
// - Cannot be redeclared or reassigned

// ReferenceError example (TDZ)
try {
    console.log(cn1); // ReferenceError: Cannot access 'cn1' before initialization
} catch(e) { console.log(e.name + ": " + e.message); }
const cn1 = 10;

// SyntaxError example (no initialization)
try {
    const cn2; // SyntaxError: Missing initializer in const declaration
} catch(e) { console.log(e.name + ": " + e.message); }

// SyntaxError example (duplicate declaration)
try {
    const cn3 = 5;
    const cn3 = 10; // SyntaxError: Identifier 'cn3' has already been declared
} catch(e) { console.log(e.name + ": " + e.message); }

// TypeError example (reassignment)
const cn4 = 50;
try {
    cn4 = 60; // TypeError: Assignment to constant variable
} catch(e) { console.log(e.name + ": " + e.message); }

/* ================= Summary Table =================

| Variable | Hoisting          | TDZ      | Re-declare | Re-assign | Scope          | Common Errors |
|----------|-----------------|----------|------------|-----------|----------------|----------------|
| var      | Yes, initialized | No       | Yes        | Yes       | Function/global| ReferenceError (undeclared), SyntaxError (strict duplicate) |
| let      | Yes, uninitialized | Yes    | No         | Yes       | Block          | ReferenceError (TDZ), SyntaxError (duplicate) |
| const    | Yes, uninitialized | Yes    | No         | No        | Block          | ReferenceError (TDZ), SyntaxError (no init/duplicate), TypeError (reassign) |

*/

