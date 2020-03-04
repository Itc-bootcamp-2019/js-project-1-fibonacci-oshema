
function getInputValue() {
    var inputVal = document.getElementById("myInput").value;

    function fibonacci(x) {
        if (x <= 1) {
            return x;
        }
        else {
            return fibonacci(x - 1) + fibonacci(x - 2);
        }
    }
    document.getElementById("result").innerText = fibonacci(inputVal);
}