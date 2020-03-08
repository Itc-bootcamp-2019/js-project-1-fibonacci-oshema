
let inputVal;
const url = 'http://localhost:5050/fibonacci/:number';
let urlWithNumber;
let serverResult;

function getFibonacci() {
    inputVal = document.getElementById("myInput").value;
    urlWithNumber = url.replace(":number", inputVal);
    console.log(urlWithNumber);
    document.getElementById("result").innerText = ""
    startSpinner();
    if (inputVal > 50) {
        document.getElementById('alertOnError').className = 'alert alert-danger';
        document.getElementById('alertOnError').innerText = "Can't be larger than 50"
        document.getElementById('myInput').style.color = '#D9534F';
        document.getElementById('myInput').style.borderColor = '#D9534F';
        removeSpinner()

    }
    else {
        removeClass42();
        removeAlert();
        getServerResult(urlWithNumber);
    }
}


async function getServerResult(x) {
    try {
        await fetch(x)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                serverResult = data.result;
            });
        document.getElementById("result").innerText = serverResult;
    }
    catch {
        fetch(x)
            .then((resp) => resp.text())
            .then((data) => {
                document.getElementById('result').className = 'class42';
                document.getElementById("result").innerText = 'Server Error: ' + data;
            })
    }
    removeSpinner();
}

function startSpinner() {
    document.getElementById('mySpinner').className = 'spinner-border spinner';
}

function removeSpinner() {
    var element = document.getElementById("mySpinner");
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