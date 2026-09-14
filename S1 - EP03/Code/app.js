const name = "Satyam Raj"
var a = 10;
var b = 20;
var c = a + b;

console.log(name);
console.log(c);

// console.log(global)
// globalThis is a built-in JavaScript object which refers to the global object


console.log(this); // EMPTY OBJECT
// {}

console.log(globalThis)
console.log(globalThis === global) 
// In Node.js level, this will return to true