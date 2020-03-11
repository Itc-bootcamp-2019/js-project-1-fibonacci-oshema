
let inputVal;
const url = 'http://localhost:5050/fibonacci/:number';
const urlResults = 'http://localhost:5050/getFibonacciResults';
let urlWithNumber;
let serverResult;

window.onload = resultsHistory(urlResults);

function getFibonacci() {
    inputVal = document.getElementById("myInput").value;
    document.getElementById("result").innerText = ""
    startSpinner('mySpinner');
    let checkstatus = document.getElementById("myCheck").checked;
    if (inputVal > 50) {
        document.getElementById('alertOnError').className = 'alert alert-danger';
        document.getElementById('alertOnError').innerText = "Can't be larger than 50"
        document.getElementById('myInput').style.color = '#D9534F';
        document.getElementById('myInput').style.borderColor = '#D9534F';
        removeSpinner('mySpinner');
    } else {
        if (checkstatus) {
            ServerFibonacci(inputVal)
        } else {
            localFibonacci(inputVal);
            removeSpinner('mySpinner');
        }
    }
    resultsHistory(urlResults);

}

function ServerFibonacci(numIn) {
    urlWithNumber = url.replace(":number", numIn);
    console.log(urlWithNumber);
    removeClass42();
    removeAlert();
    getServerResult(urlWithNumber);
}


async function getServerResult(x) {
    let resp = await fetch(x);
    if (resp.ok) {
        data = await resp.json();
        console.log(data);
        console.log(data.result);
        serverResult = data.result;
        document.getElementById("result").innerText = serverResult;
    } else {
        data = await resp.text();
        document.getElementById('result').className = 'class42';
        document.getElementById("result").innerText = 'Server Error: ' + data;
    }
    removeSpinner('mySpinner');
}

async function resultsHistory(y) {
    document.getElementById('resultHistory').innerHTML = "";
    startSpinner('spinnerResults');
    resp = await fetch(y)
    data = await resp.json();
    console.log(data.results);
    removeSpinner('spinnerResults');
    for (let i of data.results) {
        theNumber = i.number;
        theResult = i.result;
        theDate = new Date(i.createdDate);
        document.getElementById('resultHistory').innerHTML += `<br/><li>The Fibonnaci of ${theNumber} is ${theResult}. Calculated at: ${theDate} </li><hr>`;
    }
}

function startSpinner(idName) {
    document.getElementById(idName).classList.add('spinner-border');
    document.getElementById(idName).classList.add('spinner');
}

function removeSpinner(idName) {
    var element = document.getElementById(idName);
    element.classList.remove("spinner-border");
}

function removeAlert() {
    alertElement = document.getElementById("alertOnError");
    alertElement.classList.remove("alert");
    alertElement.classList.remove("alert-danger");
    document.getElementById('alertOnError').innerText = "";
    document.getElementById('myInput').style.color = '';
    document.getElementById('myInput').style.borderColor = '';
}

function removeClass42() {
    alertElement = document.getElementById("result");
    alertElement.classList.remove("class42");
    document.getElementById('result').className = 'result';
}

function localFibonacci(numIn) {
    removeClass42();
    removeAlert();
    let num0 = 0;
    let num1 = 1;
    let y = 1;
    if (numIn == 42) {
        document.getElementById('result').className = 'class42';
        y = "42 is the meaning of life";
    } else {
        for (let i = 1; i < numIn; i++) {
            num1 = y;
            y = num1 + num0;
            num0 = num1;
        }
    }
    document.getElementById("result").innerText = y;
}