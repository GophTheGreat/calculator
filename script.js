let num1 = "";
let num2 = "";
let operator = "";
let working = "0";

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
    return format(add(+a, +b));
  }
  if(operator == '-'){
    return format(subtract(a, b));
  }
  if(operator == 'X'){
    return format(multiply(+a, +b));
  }
  if(operator == '÷'){
    return format(divide(a, b));
  }
  if(operator == '='){
    console.log('yaya')
    return;
  }
}

const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const eqButton = document.querySelector(".eqButton");
console.log(numButtons);
console.log(opButtons);
const workZone = document.querySelector("#workZone");
workZone.textContent = working;

for(let i = 0; i < numButtons.length; i++){
  numButtons[i].addEventListener("click", (e) => {
    if(working == "0")
      working = e.target.textContent;
    else
      working += e.target.textContent;
    console.log(working);
    workZone.textContent = working;
    });

}


for(let i = 0; i < opButtons.length; i++){
  opButtons[i].addEventListener("click", (e) => {
    if(operator == ""){
      operator = e.target.textContent;
      if(num1 == ""){
        num1 = working;
        console.log(num1);
        working = "";
      }
      else{
        num2 = working;
        workZone.textContent = working;
      }
    }
    else{
      num2 = working;
      let answer = operate(operator, num1, num2);
      num1 = answer;
      num2 = "";
      workZone.textContent = answer;
      working = "";
      operator = e.target.textContent;
    }
    console.log(operator);
    });

}



//put button inputs into working
//when you hit an operator or equals, if num1 is empty put working into num1, else num2
//put operator into operator
//if the operator is '=', just do the operation and display it
//any other operator, do the operation and put the  

//when you hit an operator or equals, [operate] and put answer into working

console.log(format(add(5, 3)));
console.log(format(subtract(5, 3)));
console.log(format(multiply(5, 3)));
console.log(format(divide(5, 3)));
