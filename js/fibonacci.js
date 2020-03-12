
let inputVal;
const url = 'http://localhost:5050/fibonacci/:number';
const urlResults = 'http://localhost:5050/getFibonacciResults';
let urlWithNumber;
let serverResult;
let sortSelected;

window.onload = resultsHistory(urlResults);

document.getElementById("myButton").addEventListener("click", getFibonacci);

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
    removeClass42();
    removeAlert();
    getServerResult(urlWithNumber);
}

async function getServerResult(urlForFib) {
    let resp = await fetch(urlForFib);
    if (resp.ok) {
        data = await resp.json();
        serverResult = data.result;
        document.getElementById("result").innerText = serverResult;
    } else {
        data = await resp.text();
        document.getElementById('result').className = 'class42';
        document.getElementById("result").innerText = 'Server Error: ' + data;
    }
    removeSpinner('mySpinner');
}

document.getElementById("sort").addEventListener(onselect, getSort);

function getSort() {
    sortSelected = document.getElementById("sort").value;
    resultsHistory(urlResults);
}

async function resultsHistory(urlHistory) {
    document.getElementById('resultHistory').innerHTML = "";
    startSpinner('spinnerResults');
    resp = await fetch(urlHistory)
    data = await resp.json();
    removeSpinner('spinnerResults');

    if (sortSelected === "NumA") {
        sortNumberAsc(data.results);
    }
    else if (sortSelected === "NumD") {
        sortNumberDes(data.results);
    }
    else if (sortSelected === "DateA") {
        sortDateAsc(data.results);

    }
    else if (sortSelected === "DateD") {
        sortDateDes(data.results);

    }
    let ulList = document.getElementById('resultHistory');
    let fregment = document.createDocumentFragment();

    for (let i of data.results) {
        theNumber = i.number;
        theResult = i.result;
        theDate = new Date(i.createdDate);
        let oneResult = document.createElement("li");
        let line = document.createElement("hr");
        oneResult.innerText = `The Fibonnaci of ${theNumber} is ${theResult}. Calculated at: ${theDate}`;
        fregment.appendChild(oneResult);
        fregment.appendChild(line);
    }
    ulList.appendChild(fregment);
}

function sortNumberAsc(resultHistoryList) {
    resultHistoryList.sort(function (a, b) {
        return a.number - b.number;
    })
}
function sortNumberDes(resultHistoryList) {
    resultHistoryList.sort(function (a, b) {
        return b.number - a.number;
    })
}
function sortDateAsc(resultHistoryList) {
    resultHistoryList.sort(function (a, b) {
        return a.createdDate - b.createdDate;
    })
}
function sortDateDes(resultHistoryList) {
    resultHistoryList.sort(function (a, b) {
        return b.createdDate - a.createdDate;
    })
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
    let fibResult = 1;
    if (numIn == 42) {
        document.getElementById('result').className = 'class42';
        fibResult = "42 is the meaning of life";
    } else {
        for (let i = 1; i < numIn; i++) {
            num1 = fibResult;
            fibResult = num1 + num0;
            num0 = num1;
        }
    }
    document.getElementById("result").innerText = fibResult;
}