let areas = require("./areas.js");
let cowsay = require("cowsay")


let a = areas.areaCuadrado(4);

console.log(a);

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "      
}));
