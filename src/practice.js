// node src/practice.js
const name = "Ashot";
const craft = "ISS"
console.log(name);
function A(n){
    return n*0.621
}
console.log(A(10));

function B(n){
    return n**2
}
console.log(B(5));

function C(name, craft){
    return name+" is currently abroad the "+craft
}
console.log(C(name, craft));

const issPosition = {
    latitude:"10",
    longitude:"50"
}
console.log(issPosition.latitude);
console.log(issPosition.longitude);
console.log(issPosition);
