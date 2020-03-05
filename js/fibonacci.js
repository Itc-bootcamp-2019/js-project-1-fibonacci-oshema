
async function getInputValue() {
    var inputVal = document.getElementById("myInput").value;
    const url = 'http://localhost:5050/fibonacci/:number';
    userIn = url.replace(":number", inputVal);
    console.log(userIn);
    let serverResult;
    await fetch(userIn)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            serverResult = data.result;
        });
    document.getElementById("result").innerText = serverResult;
}
