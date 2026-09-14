// const { calculateMultiply } = require("./calulate/multiply");
// const { x, calculateSum } = require("./calulate/sum");


const { calcsum, calcmultiply } = require("./calulate")

const data = require("./data.json")
// import { calculateSum } from "./sum.js"
var a = 10;
var b = 20;
console.log(a)

calcsum(a, b);
calcmultiply(a, b)

console.log(data.name)
console.log(data.city)
