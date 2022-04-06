let num1 = "";
let num2 = "";
let operator = "";
let working = "";
let answer = "";
let active = "num1";
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
workZone.textContent = "";


for(let i = 0; i < numButtons.length; i++){numButtons[i].addEventListener("click", appendNumber)};
for(let i = 0; i < opButtons.length; i++){opButtons[i].addEventListener("click", appendOperator)};
eqButton.addEventListener("click", equals);
clearButton.addEventListener("click", clear);
decimalButton.addEventListener("click", appendDecimal);

function equals(){
  console.log(`Clicked "equals" <${num1} ${operator} ${num2}> working = ${working}`);
  if(inEqualsLoop == true){
    num1 = workZone.textContent;
    answer = solve();
    workZone.textContent = answer;
    working = answer;
    return;
  }
  if(active == "num1")
    num1 = working;
  if(active == "num2")
    num2 = working;
  answer = solve();
  workZone.textContent = answer;
  working = answer;
  inEqualsLoop = true;
}

function appendNumber(){
  if(working == '0' || working == "")
    working = this.textContent;
  else
    working += this.textContent;
  workZone.textContent = working;
  console.log(`Pressed button "${this.textContent}". Current status: <${num1} ${operator} ${num2}> working = ${working}`); 
}

function appendDecimal(){
  if(working.includes(".")){
    if(!this.classList.contains("inactive"))
      this.classList.add("inactive");
    return;
  }
  else{
    if(this.classList.contains("inactive"))
      this.classList.remove("inactive");
    workZone.textContent += this.textContent;
    working += this.textContent;
    this.classList.add("inactive");
    return;
  } 
}

function appendOperator(){
  console.log(`Active is ${active}`);
  if(this.textContent != operator && operator != ""){
    if(!inEqualsLoop)
    {
      num2 = workZone.textContent;
      answer = solve();
      num1 = answer;
      workZone.textContent = answer;
      active = "num2";
      working = "";
      operator = this.textContent;
      inEqualsLoop = "false";
      return;
    }
    else{
      num1 = workZone.textContent;
      working = "";
      active = "num2";
      operator = this.textContent;
      inEqualsLoop = "false";
      return;
    }
  }
  operator = this.textContent;
  if(active == "num1"){
    num1 = workZone.textContent;
    active = "num2";
    working = "";
  }
  else if(active == "num2"){
    num2 = workZone.textContent;
    answer = solve();
    num1 = answer;
    workZone.textContent = answer;
    active = "num2";
  }
  working = "";
  inEqualsLoop = "false";
  console.log(`Appending operator ${this.textContent}\nActive = ${active}`)
  console.log(`Current status: <${num1} ${operator} ${num2}> working = ${working}`); 
}


function solve(){
  console.log(`Solve evaluating ${num1} ${operator} ${num2}`);
  if(num1 && num2){
    console.log(`Solving...`);
    answer = operate(operator, num1, num2);
    updateDecimalInactive(decimalButton);
    console.log(`Ending with ${num1} ${operator} ${num2} = ${answer} \n\n\n`);
    return answer;
  }
  console.log(`Skipping solve`);
  return;
}

function clear(){
  num1 = "";
  num2 = "";
  operator = "";
  answer = "";
  working = "0";
  inEqualsLoop = false;
  workZone.textContent = "0";
  active = "num1";
}

function updateDecimalInactive(decimalButton){
  console.log(`Updating decimal. Working is "${working}" and type of ${typeof working}`);
  if(toString(working).includes(".")){
    if(!decimalButton.classList.contains("inactive"))
      decimalButton.classList.add("inactive");
    return;
  }
  else{
    if(decimalButton.classList.contains("inactive"))
      decimalButton.classList.remove("inactive");
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
