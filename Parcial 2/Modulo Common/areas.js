function areaCuadrado(Lado){
    return Lado*Lado;
}
function areaTriangulo(base,altura){
    return ((base*altura)/2);
}

module.exports.areaCuadrado=areaCuadrado;
module.exports.areaTriangulo=areaTriangulo;

console.log(module);

