
let x = '   HELPHELPHELPHELPHELPHELPHELPHELPHELP   ';


const checkType = function hard(x) {
    if (typeof x !== "string") {
        console.log('This is not a string!');
        return 0;
    } 
    x = x.trim();
    if (x.length > 30){
        x = x.slice(0, 30) + "...";
        console.log('Ok!');
    }
    console.log(x);    
};

checkType(x);