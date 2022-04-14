
// Memory Game
const memoryGame = document.querySelector(".memory-game .cards");
let cards = document.querySelectorAll(".memory-game .card");
let themes = document.querySelectorAll(".swither-theme span");
const amounts = document.querySelector('.amounts');


let num = 20;
let isPlay = false;
let select = 0;
let past;
let rep = 0;
let clickable = true;

// Create Cards
createCards();

amounts.addEventListener('click', (ev) => {
    if ( ev.target.classList.contains('amount') ) {
        num = parseInt(ev.target.getAttribute('data-amount'));

        // reset all variables
        isPlay = false;
        select = 0;
        past;
        rep = 0;
        clickable = true;

        // create cards
        createCards();

        theme();
    }
});

// Add Theme to cards
function theme() {
    themes.forEach(ev => {
        ev.addEventListener("click", function(e) {
            cards.forEach(el => { el.style.backgroundColor = `${e.target.getAttribute("data-color")}` })
            // Add Theme To LC
            localStorage.setItem("theme", e.target.getAttribute("data-color"));
        })
    })
    // Get LC Theme
    cards.forEach(el => { el.style.backgroundColor = `${localStorage.getItem("theme")}` });
}



memoryGame.addEventListener("click", e => {
    if ( e.target.classList.contains("card") && !e.target.classList.contains("correct") && clickable) {
        if ( !isPlay ) {
            showNums();
            isPlay = true;
            clickable = false;
            clickAbleWhen(2);
        }
        rep++;
        if ( isPlay && rep !== 1 ) {
            if ( select < 2 ) {
                if ( e.target !== past ) {
                    e.target.innerText = e.target.getAttribute("num");
                    select++;
                }
            }

            if ( select === 2 ) {
                compair(past, e.target);
                select = 0;
                clickable = false;
                clickAbleWhen(1);
                checkWin();
            }

            past = e.target;
        }
    }
})



function createCards() {
    memoryGame.innerHTML = '';
    for ( let i = 0; i < num; i++ ) {
        let card = document.createElement("div");
        // Add Class to card
        card.classList.add("card");
        // Add Text
        card.innerText = "?";
        // Append Card to memoryGame
        memoryGame.appendChild(card);
    }
    cards = document.querySelectorAll(".memory-game .card");

    randomNumber();
}

function randomNumber() {
    let numsArr = [];
    // Make Random Nummbers
    while ( numsArr.length !== cards.length ) {
        let randomNum = Math.floor(Math.random()*cards.length);

        if ( !numsArr.includes(randomNum)) {
            numsArr.push(randomNum);
        }
    }

    // Set Numbers In Cards
    let ins = 1;
    cards.forEach((e, i) => {
        cards[numsArr[i]].setAttribute("num", ins);
        ins++;
        if ( ins > cards.length/2 )
            ins = 1;
    });
}


function showNums() {
    cards.forEach(e => {
        e.innerText = e.getAttribute("num");
    })

    setTimeout(() => {
        cards.forEach(e => {
            e.innerText = '?';
        })
    }, 2000)
}

function compair(c1, c2) {
    if ( c1.getAttribute("num") === c2.getAttribute("num") ) {
        c1.classList.add("correct");
        c2.classList.add("correct");
    } else {
        staticNum();
    }


    setTimeout(() => {
        cards.forEach(e => {
            e.innerText = '?';
        })
    }, 1000)

    setTimeout(() => {
        staticNum()
    }, 1000)
}

function staticNum() {
    cards.forEach(e => {
        if ( e.className.includes("correct") ) {
            e.innerText = e.getAttribute("num");
        }
    })
}

function clickAbleWhen(t) {
    setTimeout(function() {
        clickable = true;
    }, t * 1000)
}

function checkWin() {
    let count = 0;;
    cards.forEach(e => {
        if ( e.classList.contains("correct") )
            count++
    })
    if ( count === cards.length )
        alert("You Win!");
}