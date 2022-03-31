function add(a, b){
  return (a + b);
}

function subtract(a, b){
  return (a - b);
}

function multiply(a, b){
  return (a * b);
}

function divide(a, b){
  return (a / b);
}

function format(a){
  return Math.round(a * 100000000)/100000000; //8 decimals
}

function operate(operator, a, b){
  if(operator == '+'){
    return format(add(a, b));
  }
  if(operator == '-'){
    return format(subtract(a, b));
  }
  if(operator == '*'){
    return format(multiply(a, b));
  }
  if(operator == '/'){
    return format(divide(a, b));
  }
}

console.log(format(add(5, 3)));
console.log(format(subtract(5, 3)));
console.log(format(multiply(5, 3)));
console.log(format(divide(5, 3)));