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
        case '÷':
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
    let MD = ['x', '÷']
    let AS = ['+', '-']

    if (arr.length > 2) {
        // First, evaluate any exponents.
        for (let i=0; i<arr.length; i++) {
            if (arr[i] === "^") {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
        // Second, evaluate all the multiplication and division expressions.
        for (let i=0; i<arr.length; i++) {
            if (MD.includes(arr[i])) {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
        // Third, evaluate all the addition and subtraction expressions.
        for (let i=0; i<arr.length; i++) {
            if (AS.includes(arr[i])) {
                let total = operate(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, total);
                return evaluate(arr);
            }
        }
    } else {
        // Return an error message if the user tried to divide by zero.
        if (arr[0] === Infinity) {
            return "Don't divide by zero!"
        } else {
            return arr[0];
        }
    }
}

function evaluateParen(arr) {
    // First, test to see if this function is needed, i.e., if the statement includes parentheses.
    if (arr.includes("(")) {
        // Loop through each array element to find the first close parenthesis.
        for (let i=0; i<arr.length; i++) {
            if (arr[i] === ")") {
                // Find the closest preceding open parenthesis to pull out the innermost expression in parentheses.
                let start = arr.lastIndexOf("(", i);
                let phrase = arr.splice(start+1, (i-start-1)); // Omit the parentheses in the phrase.
                let total = evaluate(phrase);
                arr.splice(start-1, (i-start), total);
                // Use recursion to solve any other expressions in parentheses.
                return evaluateParen(arr);
                } 
            }
    } else {    // If there are no parentheses, run the evaluate function.
        console.log(arr);
        return evaluate(arr);
    }
}

function calculate() {
    let statement = input.textContent
            .replace("=", "")           // Remove the equal sign at the end of the expression
            .split(/([^0-9\.])/)        // Split the string into an array on anything that isn't a number or decimal.
    output.textContent = (evaluateParen(statement));
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
buttons.pop();          // remove the "=" button 
buttons.splice(0,2);    // remove the "clear" and "delete" buttons
buttons.splice(13,1);   // remove the "." button
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

// Add keyboard functionality
calcKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '^', '(', ')']
window.addEventListener("keydown", (e) => {
    if (calcKeys.includes(e.key)) {
        let keyInput = e.key.replace('*', 'x').replace('/', '÷')
        if (output.textContent) {
            input.textContent = keyInput;
            output.textContent = '';
        } else {
        input.textContent += keyInput;
        }
        e.preventDefault();
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key === '=' || e.key === "Enter") {
        // Copy the calculate function
        let statement = input.textContent
            .replace("=", "")
            .split(/([^0-9\.])/)
        output.textContent = (evaluateParen(statement));
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
        input.textContent = input.textContent.slice(0,-1);
    }
});
