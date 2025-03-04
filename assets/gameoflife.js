$(document).ready(function() {
    var canvas = document.getElementById("golCanvas");
    canvas.width = $('.titlecontainer').width();
    canvas.height = $('.titlecontainer').height();
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var ctx = canvas.getContext("2d");
    var LEN = 10;
    var x = Math.floor(WIDTH / LEN);
    var y = Math.floor(HEIGHT / LEN);
    var myGol;
    var golTmp;

    function initTmp() {
        golTmp = [];  // Initialize golTmp as an empty array
        for (var xVal = 0; xVal <= x + 2; xVal++) {
            golTmp[xVal] = [];
            for (var yVal = 0; yVal <= y + 2; yVal++) {
                golTmp[xVal][yVal] = 0;
            }
        }
    }

    function initMatrix() {
        // reset matrix
        myGol = [];
        golTmp = [];

        for (var xVal = 0; xVal <= x + 2; xVal++) {
            myGol[xVal] = [];
            golTmp[xVal] = [];
            for (var yVal = 0; yVal <= y + 2; yVal++) {
                golTmp[xVal][yVal] = 0;
                var randVal = Math.floor(Math.random() * 2);
                myGol[xVal][yVal] = randVal;
                if (randVal == 1) {
                    draw(xVal + 1, yVal + 1);
                }
            }
        }
    }

    function draw(x, y) {
        ctx.fillRect(LEN * (x - 1), LEN * (y - 1), LEN, LEN);
    }

    function nextStep() {
        // reset tempArray
        initTmp();
        // reset canvas
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var xVal = 1; xVal <= x + 1; xVal++) {
            for (var yVal = 1; yVal <= y + 1; yVal++) {
                var neighbourSum = myGol[xVal - 1][yVal] + myGol[xVal - 1][yVal - 1] + myGol[xVal - 1][yVal + 1] + myGol[xVal][yVal - 1] + myGol[xVal][yVal + 1] + myGol[xVal + 1][yVal] + myGol[xVal + 1][yVal + 1] + myGol[xVal + 1][yVal - 1];
                if (myGol[xVal][yVal] == 1) {
                    if (neighbourSum == 2 || neighbourSum == 3) {
                        golTmp[xVal][yVal] = 1;
                        ctx.fillStyle = "#F4ACB7";
                        draw(xVal, yVal);
                    }
                } else {
                    if (neighbourSum == 3) {
                        golTmp[xVal][yVal] = 1;
                        ctx.fillStyle = "#79ADDC";
                        draw(xVal, yVal);
                    }
                }
            }
        }

        myGol = golTmp.slice();
    }

    initMatrix();
    setInterval(nextStep, 100);
});