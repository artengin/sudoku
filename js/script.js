let h2 = document.querySelector("h2");
let newGame = document.querySelector(".newGame");
let pauseGame = document.querySelector(".pauseGame");
let pauseGameBtn = document.querySelector(".pauseGameBtn");
let continueGameBtn = document.querySelector(".continueGame");
let startGame = document.querySelector(".startGame");
let levelTitleBlock = document.querySelector(".levelTitleBlock");
let levelNumber = levelTitleBlock.querySelectorAll("span");
var timeGame = document.querySelector('.timeGame');
var chekCorrect = document.querySelector('.chekCorrect');
var controlPanel = document.querySelector('.controlPanel');
let sec = 0;
let min = 0;
var t;
let gameField = document.querySelector(".gameField");
let rowFieldObject = {
        rowField1: document.querySelectorAll(".row1"),
        rowField2: document.querySelectorAll(".row2"),
        rowField3: document.querySelectorAll(".row3"),
        rowField4: document.querySelectorAll(".row4"),
        rowField5: document.querySelectorAll(".row5"),
        rowField6: document.querySelectorAll(".row6"),
        rowField7: document.querySelectorAll(".row7"),
        rowField8: document.querySelectorAll(".row8"),
        rowField9: document.querySelectorAll(".row9")
    }
//Таймер
function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
};

function add() {
    tick();
    timeGame.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
};

function timer() {
    t = setTimeout(add, 1000);
};

function stopTimer() {
    clearTimeout(t);
};

function resetTimer() {
    timeGame.textContent = "00:00";
    sec = 0;
    min = 0;
};
// Кнопка новая игра
startGame.addEventListener("click", newGameStart);

function newGameStart(e) {
    newGame.classList.remove("active");
    h2.textContent = "Судоку";

    function clearRes(er) {
        for (let i = 0; i <= 8; i++) {
            er[i].value = "";
            er[i].removeAttribute("disabled");
            er[i].setAttribute("placeholder", "");
            if (er[i].classList.contains("focusSquare")) {
                er[i].classList.remove("focusSquare");
            }
                    if (er[i].classList.contains("correctRes")) {
                        er[i].classList.remove("correctRes");
                    }
        }
    }
    for (let value of Object.values(rowFieldObject)) {
        clearRes(value);
    }
    pauseGameBtn.classList.remove("activeBtn");
    resetTimer();
    startGame1();
    timer();
};
pauseGameBtn.addEventListener("click", pauseCheck);

function pauseCheck() {
    if(!newGame.classList.contains("active")){
        if(pauseGameBtn.classList.contains("activeBtn")){
            continueOn();
        }else{
            pauseOn();
        }
    }
};
function pauseOn() {
    pauseGame.classList.add("activePause");
    pauseGameBtn.classList.add("activeBtn");
    stopTimer()
};
continueGameBtn.addEventListener("click", continueOn);

function continueOn() {
    pauseGame.classList.remove("activePause");
    pauseGameBtn.classList.remove("activeBtn");
    timer();
};
levelTitleBlock.addEventListener("click", changeLevel);

function changeLevel(e) {
    for (let value of levelNumber) {
        if (value.classList.contains("activeLevel")) {
            value.classList.remove("activeLevel");
        }
            if (pauseGame.classList.contains("activePause")) {
                pauseGame.classList.remove("activePause");
            }
        let classNameLevelActive = "levelTitleLevel" + value.textContent;
        if (levelTitleBlock.classList.contains(classNameLevelActive)) {
            levelTitleBlock.classList.remove(classNameLevelActive);
        }
        if (e.target == value) { 
            newGame.classList.add("active");
            value.classList.add("activeLevel");
            h2.textContent = "Уровень: " + value.textContent;
            levelTitleBlock.classList.add(classNameLevelActive);
            stopTimer()
            resetTimer()
        }
    }
};
// Создание поля
function startGame1() {
    let numberObject = {
        numberArray1: [2, 3, 8, 9, 6, 5, 7, 1, 4],
        numberArray2: [7, 5, 9, 4, 1, 3, 6, 8, 2],
        numberArray3: [4, 1, 6, 2, 7, 8, 9, 5, 3],
        numberArray4: [9, 4, 5, 1, 3, 6, 2, 7, 8],
        numberArray5: [6, 8, 7, 5, 2, 4, 1, 3, 9],
        numberArray6: [3, 2, 1, 8, 9, 7, 4, 6, 5],
        numberArray7: [1, 6, 2, 3, 5, 9, 8, 4, 7],
        numberArray8: [5, 7, 4, 6, 8, 2, 3, 9, 1],
        numberArray9: [8, 9, 3, 7, 4, 1, 5, 2, 6],
    }
    let numberTemaplate1 = [1, 2, 3];
    let numberTemaplate2 = [4, 5, 6];
    let numberTemaplate3 = [7, 8, 9];
    let rowNumberArray1 = [numberObject.numberArray1, numberObject.numberArray2, numberObject.numberArray3];
    let rowNumberArray2 = [numberObject.numberArray4, numberObject.numberArray5, numberObject.numberArray6];
    let rowNumberArray3 = [numberObject.numberArray7, numberObject.numberArray8, numberObject.numberArray9];
    let rowFieldCase1 = [rowFieldObject.rowField1, rowFieldObject.rowField2, rowFieldObject.rowField3];
    let rowFieldCase2 = [rowFieldObject.rowField4, rowFieldObject.rowField5, rowFieldObject.rowField6];
    let rowFieldCase3 = [rowFieldObject.rowField7, rowFieldObject.rowField8, rowFieldObject.rowField9];
    let bigRowNumber = [rowNumberArray1, rowNumberArray2, rowNumberArray3];
    let bigRowField = [rowFieldCase1, rowFieldCase2, rowFieldCase3];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    shuffle(numberTemaplate1);
    shuffle(numberTemaplate2);
    shuffle(numberTemaplate3);

    function shuffleColumnBig(array) {
        shuffleColumn(numberTemaplate1, array, 0);
        shuffleColumn(numberTemaplate2, array, 3);
        shuffleColumn(numberTemaplate3, array, 6);
    };
    for (let value of Object.keys(numberObject)) {
        shuffleColumnBig(value);
    }

    function shuffleColumn(template, array, step) {
        for (let i = 0; i < 3; i++) {
            let j = template[i] - 1;
            i += step;
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    shuffle(rowNumberArray1);
    shuffle(rowNumberArray2);
    shuffle(rowNumberArray3);
    shuffle(bigRowNumber);

    function shuffleBig(row, array) {
        for (let i = 0; i < 3; i++) {
            shuffleRow(row[i], array[i]);
        }
    };
    shuffleBig(bigRowField, bigRowNumber);

    function shuffleRow(row, array) {
        for (let i = 0; i < 3; i++) {
            fillingField(row[i], array[i]);
        }
    };

    function fillingField(row, array) {
        for (let value of levelNumber) {
            if (value.classList.contains("activeLevel")) {
                let levelNumb = value.textContent;
                startLevelGame(levelNumb);
            }
        }

        function startLevelGame(n) {
            for (let i = 0; i <= 8; i++) {
                switch (n) {
                    case "1":
                        randomSqare(2);
                        break;
                    case "2":
                        randomSqare(3);
                        break;
                    case "3":
                        randomSqare(4);
                        break;
                    case "4":
                        randomSqare(5);
                        break;
                    case "5":
                        randomSqare(6);
                        break;
                    case "6":
                        randomSqare(7);
                        break;
                }

                function randomSqare(n) {
                    if (Math.random() * 10 > n) {
                        row[i].value = array[i];
                        row[i].setAttribute("disabled", "disabled");
                        row[i].setAttribute("placeholder", array[i]);
                    } else {
                        row[i].setAttribute("placeholder", array[i]);
                    }
                }
            }
        };
    };
    gameField.addEventListener("click", chekCor1);
    function chekCor1(e) {
        function clearCorSquare1(er) {
            for (let i = 0; i <= 8; i++) {
                if (er[i].classList.contains("correctRes")) {
                        er[i].classList.remove("correctRes");
                }
            }
        };
        for (let value of Object.values(rowFieldObject)) {
            clearCorSquare1(value);
        }
    };
    
    controlPanel.addEventListener("click", enterValue);
    function enterValue(e) {
         let focusSqare;
        function focusValue(er) {
            for (let i = 0; i <= 8; i++) {
                if (er[i].classList.contains("focusSquare")) {
                    focusSqare = er[i].value;
                    break;
                }
            }
        }
        for (let value of Object.values(rowFieldObject)) {
            focusValue(value);
        }
        function enterValueIn(er) {
            for (let i = 0; i <= 8; i++) {
                if (er[i].classList.contains("act")) {
                    er[i].value = e.target.textContent; 
                        if(e.target.textContent == focusSqare) {
                            er[i].classList.add("focusSquare");
                        }
                }
            }
        };
        for (let value of Object.values(rowFieldObject)) {
            enterValueIn(value);
        }
        let chekedSqare = e.target;
        let check = 0;
        function chekRes(er) {
            for (let i = 0; i <= 8; i++) {
                let placeHolder = er[i].getAttribute("placeholder");
                if (er[i].value == placeHolder) {
                    check++;
                }
            }
        };
        for (let value of Object.values(rowFieldObject)) {
            chekRes(value);
        }
        if (check == 81) {
            pauseGameBtn.classList.add("activeBtn");
            newGame.classList.add("active");
            h2.textContent = "Победа!";
            stopTimer();
        }
    };
    // Кнопка проверка
    chekCorrect.addEventListener("click", chekCor);
    function chekCor(e) {
        function clearCorSquare(er) {
            for (let i = 0; i <= 8; i++) {
                if (er[i].classList.contains("act")) {
                    er[i].classList.remove("act");
                }
                if (er[i].classList.contains("focusSquare")) {
                        er[i].classList.remove("focusSquare");
                }
                let placeholder = er[i].getAttribute("placeholder");
                let val1 = er[i].value;
                if (!er[i].getAttribute("disabled")) {
                    if(val1 == placeholder){     
                         er[i].classList.add("correctRes");     
                    }
                }
            }
        };
        for (let value of Object.values(rowFieldObject)) {
            clearCorSquare(value);
        }
    };
    
    gameField.addEventListener("click", chekResult);
    function chekResult(e) {
        function clearFocus(er) {
            if (!e.target.value == "") {
                for (let i = 0; i <= 8; i++) {
                    if (er[i].classList.contains("focusSquare")) {
                        er[i].classList.remove("focusSquare");
                    }
                    if (er[i].classList.contains("correctRes")) {
                        er[i].classList.remove("correctRes");
                    }
                    if (er[i].classList.contains("act")) {
                        er[i].classList.remove("act");
                    }
                }
            }
            if(!e.target.getAttribute("disabled")) {
                    for (let i = 0; i <= 8; i++) {
                        if (er[i].classList.contains("act")) {
                            er[i].classList.remove("act");
                        }
                    }
                    e.target.classList.add("act");
            }
        }
        for (let value of Object.values(rowFieldObject)) {
            clearFocus(value);
        }
        function chekR(er) {
            for (let i = 0; i <= 8; i++) {
                if (er[i].value == e.target.value) {
                    er[i].classList.add("focusSquare");
                }
            }
        };
        if (!e.target.value == "") {
            for (let value of Object.values(rowFieldObject)) {
                chekR(value);
            }
        }
    }
};