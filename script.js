let num1 = "";
let num2 = "";
let operator = "";
let working = "";
let answer = "";

let inEqualsLoop = false;

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
  return Math.round(a * 100000)/100000; //5 decimals
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
  if(operator == 'SQRT'){
    return format(squareRoot(a));
  }
  else
    return;
}

const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const eqButton = document.querySelector(".eqButton");
const clearButton = document.querySelector(".clearButton");
const sqrtButton = document.querySelector(".sqrtButton");
const decimalButton = document.querySelector("#decimalButton");
const workZone = document.querySelector("#workZone");

workZone.textContent = working;



//Numerical buttons
for(let i = 0; i < numButtons.length; i++){
  numButtons[i].addEventListener("click", (e) => {
    if(answer){
      answer = "";
      workZone.textContent += e.target.textContent;
      working = workZone.textContent;
      num1 = "";
      num2 = "";
      operator = "";
      console.log(`Clicked numeral "${e.target.textContent}" with prev answer. State is <${num1} ${operator} ${num2}> working = ${working}`);
      console.log("Exiting equals");
      inEqualsLoop = false;
      return;
    }
    if(num2 != ""){
      working = workZone.textContent;
      num2 = "";
      num1 = "";
    }
    if(working == "0" || working == ""){
      workZone.textContent = e.target.textContent;
      working = e.target.textContent;
    }
    else{
      workZone.textContent += e.target.textContent;
      working += e.target.textContent;
    }
    console.log(`Clicked numeral "${e.target.textContent}"  <${num1} ${operator} ${num2}> working = ${working}`);
    });
}

//Operator buttons
for(let i = 0; i < opButtons.length; i++){
  opButtons[i].addEventListener("click", (e) => {
    if(operator == ""){
      operator = e.target.textContent;
      if(num1 == "" || num1 == "0"){
        if(inEqualsLoop == true){
          inEqualsLoop = false;
          console.log("Exiting equals");
          updateDecimalInactive(decimalButton);
        };
        num1 = workZone.textContent;
        console.log(`Operator set as ${e.target.textContent}`);
        working = "";
      }
      working = "";
    } 
    else {
      if(inEqualsLoop == true)
      {
        num2 = working;
        operator = e.target.textContent;
        working = "";
        inEqualsLoop = false;
        console.log("Exiting equals");
        updateDecimalInactive(decimalButton);
      };
      solve();
      operator = e.target.textContent;
    };
    updateDecimalInactive(decimalButton);
    console.log("Clearing answer")
    answer = "";
    console.log(`Clicked operator <${num1} ${operator} ${num2}> working = ${working}`);
  });
}

eqButton.addEventListener("click", () => {
      console.log(`Clicked "equals" <${num1} ${operator} ${num2}> working = ${working}`);
  if(num1 && operator){
    answer = solve();
    workZone.textContent = answer;
    working = num2;
    inEqualsLoop = true;
    updateDecimalInactive(decimalButton);
    return;
  }
  else{
    return;
  }
});

function solve(){
  num2 = working;
  console.log(`Solve evaluating ${num1} ${operator} ${num2}`);
  if(num1 && num2){
    console.log(`Solving...`);
    answer = operate(operator, num1, num2);
    num1 = answer;
    workZone.textContent = answer;
    working = "";
    updateDecimalInactive(decimalButton);
    console.log(`Ending with ${num1} ${operator} ${num2} \n`);
    return answer;
  }
  console.log(`Skipping solve`);
  return;
}

clearButton.addEventListener("click", () => {
  num1 = "0";
  num2 = "";
  operator = "";
  answer = "";
  working = "0";
  inEqualsLoop = false;
  workZone.textContent = working;
});

decimalButton.addEventListener("click", (e) => {
  if(working.includes(".")){
    if(!e.target.classList.contains("inactive"))
      e.target.classList.add("inactive");
    return;
  }
  else{
    if(e.target.classList.contains("inactive"))
      e.target.classList.remove("inactive");
    workZone.textContent += e.target.textContent;
    working += e.target.textContent;
    e.target.classList.add("inactive");
    return;
  } 
});

function updateDecimalInactive(button){
  if(working.includes(".")){
    if(!button.classList.contains("inactive"))
      button.classList.add("inactive");
    return;
  }
  else{
    if(button.classList.contains("inactive"))
      button.classList.remove("inactive");
    return;
  }
}

sqrtButton.addEventListener("click", () => {
  num1 = workZone.textContent;
  answer = Math.sqrt(num1);
  working = "";
  workZone.textContent = answer;
  num1 = answer;
  num2 = "";
  updateDecimalInactive(decimalButton);
  return;
});

function squareRoot(num){
  return Math.sqrt(num);
}
