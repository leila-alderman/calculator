let input = document.querySelector("#input");
let output = document.querySelector("#output");
let operators = document.querySelectorAll(".operators");

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return Number(num1) + Number(num2);
        case '-':
            return Number(num1) - Number(num2);
        case 'x':
            return Number(num1) * Number(num2);
        case '/':
            return Number(num1) / Number(num2);
        case '^':
            return Math.pow(Number(num1), Number(num2));
        default:
            console.log("Invalid operator");
            break;
    }
}

function evaluate(arr) {
    console.log(arr);
    let MD = ['x', '/']
    let AS = ['+', '-']

    if (arr.length > 2) {
        for (let i=0; i<arr.length; i++) {
            if (arr[i] === "(") {
                let end = arr.indexOf(")");

                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
        for (let i=0; i<arr.length; i++) {
            if (arr[i] === "^") {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
        for (let i=0; i<arr.length; i++) {
            if (MD.includes(arr[i])) {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
        for (let i=0; i<arr.length; i++) {
            if (AS.includes(arr[i])) {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
    } else {
        if (arr[0] === Infinity) {
            return "Don't divide by zero!"
        } else {
            return arr[0];
        }
    }
}

function calculate() {
    let statement = input.textContent
            .replace("=", "")
            .split(/([^0-9\.])/)
    output.textContent = (evaluate(statement));
}

function displayInput(e) {
    // clear the input and output from the last calculation
    if (output.textContent) {
        input.textContent = e.target.innerText;
        output.textContent = '';
    } else {
    input.textContent += e.target.innerText;
    }
}

function displayDecimal(e) {
    // clear the input and output from the last calculation
    if (output.textContent) {
        input.textContent = e.target.innerText;
        output.textContent = '';
    } else {
    input.textContent += e.target.innerText;
    // prevent the user from entering more than one decimal per number
    decimal.removeEventListener("click", displayDecimal);
    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            decimal.addEventListener("click", displayDecimal);
        })
    })
    }
}

function resetDisplay (e) {
    input.textContent = e.target.innerText;
}


let buttons = Array.from(document.querySelectorAll("button"));
buttons.pop(); // remove the "=" button 
buttons.splice(0,2); // remove the "clear" and "delete" buttons
buttons.splice(13,1); // remove the "." button
buttons.forEach(button => {
    button.addEventListener("click", displayInput);
})

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", displayDecimal)

const equals = document.querySelector("#equals");
equals.addEventListener("click", calculate);

const clear = document.querySelector("#clear");
clear.addEventListener("click", (e) => {
    input.textContent = '';
    output.textContent = '';
})

const backspace = document.querySelector("#delete");
backspace.addEventListener("click", (e) => {
    input.textContent = input.textContent.slice(0,-1);
})

