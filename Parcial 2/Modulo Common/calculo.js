let areas = require("./areas.js");
let cowsay = require("cowsay")
const catsay = require('@miaos/catsay');
let a = areas.areaCuadrado(4);
console.log(a);

console.log(catsay.say({
    text: 'I Love You',
    eye: '9', 
    E: '9', 
    mouse: 'w', 
    M: 'w', 
    boxStyle: 'box', 
    B: 'box', 
  }));
  

//console.log(cowsay.say({
    //text : "I'm a moooodule",
    //e : "oO",
    //T : "U "      
//}));
