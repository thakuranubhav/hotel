/*console.log("let's start the server")
function add(a,b){
    return a+b;
}
let c= add(4,5);
console.log(c);
let d= (a,b)=>{
    return a*b;
}
var mul=d(2,3);
console.log(mul)*/
// Callback- Callback is nothing but passing function as an argument to the other function
/*function callback(){
    console.log("adding sucessfull");
}
const add=function(a,b,callback){
    var result=a+b;
    console.log(result);
    callback();
}
add(45,56,callback);*/
const notes=require('./notes.js');
var rohit =require('lodash');
const data=["person",34,"person"];
var filter= rohit.uniq(data);
console.log(filter);

console.log(notes.age);
console.log(notes.addNumbers(3,56));

