
function getInputValue() {
    var inputVal = document.getElementById("myInput").value;

    function fibonacci(x) {
        let num0 = 0;
        let num1 = 1;
        let y = 0;
        for (let i = 1; i < x; i++) {
            num0 = y;
            y = num1 + num0;
            num1 = num0;
        }
        document.getElementById("result").innerText = y;
    }


    fibonacci(inputVal);
}


