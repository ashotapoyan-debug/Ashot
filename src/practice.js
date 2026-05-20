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

const asteroids = [
    { name: "2024 AB1",diameter: 120,hazardous: false },
    { name: "2024 CD2",diameter: 45,hazardous: true },
    { name: "2024 EF3",diameter: 890,hazardous: false },
    { name: "2024 GH4", diameter: 23,hazardous: true }
    ]
const names = asteroids.map(asteroids => asteroids.name);
console.log(names);
const hazardous = asteroids.filter(asteroids => asteroids.hazardous === true);
console.log(hazardous);
const diameter = asteroids.filter(asteroids => asteroids.diameter);
console.log(diameter);
