
const deck = ["./Sprites/AC.png", "./Sprites/2C.png", "./Sprites/3C.png", "./Sprites/4C.png", "./Sprites/5C.png", "./Sprites/6C.png", "./Sprites/7C.png", "./Sprites/8C.png", "./Sprites/9C.png", "./Sprites/10C.png", "./Sprites/JC.png", "./Sprites/QC.png", "./Sprites/KC.png",
            "./Sprites/AD.png", "./Sprites/2D.png", "./Sprites/3D.png", "./Sprites/4D.png", "./Sprites/5D.png", "./Sprites/6D.png", "./Sprites/7D.png", "./Sprites/8D.png", "./Sprites/9D.png", "./Sprites/10D.png", "./Sprites/JD.png", "./Sprites/QD.png", "./Sprites/KD.png",
            "./Sprites/AH.png", "./Sprites/2H.png", "./Sprites/3H.png", "./Sprites/4H.png", "./Sprites/5H.png", "./Sprites/6H.png", "./Sprites/7H.png", "./Sprites/8H.png", "./Sprites/9H.png", "./Sprites/10H.png", "./Sprites/JH.png", "./Sprites/QH.png", "./Sprites/KH.png",
            "./Sprites/AS.png", "./Sprites/2S.png", "./Sprites/3S.png", "./Sprites/4S.png", "./Sprites/5S.png", "./Sprites/6S.png", "./Sprites/7S.png", "./Sprites/8S.png", "./Sprites/9S.png", "./Sprites/10S.png", "./Sprites/JS.png", "./Sprites/QS.png", "./Sprites/KS.png"];
let hidden;
const dealerDeck = [];
const playerDeck = [];
let scorePlayer = 0;
let scoreDealer = 0;
let a1ValueSelected = false;
let a11ValueSelected = false;

//Use parallel arrays to check the value of a card. (2C = 2);
const card = ["./Sprites/2C.png", "./Sprites/3C.png", "./Sprites/4C.png", "./Sprites/5C.png", "./Sprites/6C.png", "./Sprites/7C.png", "./Sprites/8C.png", "./Sprites/9C.png", "./Sprites/10C.png", "./Sprites/JC.png", "./Sprites/QC.png", "./Sprites/KC.png",
            "./Sprites/2D.png", "./Sprites/3D.png", "./Sprites/4D.png", "./Sprites/5D.png", "./Sprites/6D.png", "./Sprites/7D.png", "./Sprites/8D.png", "./Sprites/9D.png", "./Sprites/10D.png", "./Sprites/JD.png", "./Sprites/QD.png", "./Sprites/KD.png",
            "./Sprites/2H.png", "./Sprites/3H.png", "./Sprites/4H.png", "./Sprites/5H.png", "./Sprites/6H.png", "./Sprites/7H.png", "./Sprites/8H.png", "./Sprites/9H.png", "./Sprites/10H.png", "./Sprites/JH.png", "./Sprites/QH.png", "./Sprites/KH.png",
            "./Sprites/2S.png", "./Sprites/3S.png", "./Sprites/4S.png", "./Sprites/5S.png", "./Sprites/6S.png", "./Sprites/7S.png", "./Sprites/8S.png", "./Sprites/9S.png", "./Sprites/10S.png", "./Sprites/JS.png", "./Sprites/QS.png", "./Sprites/KS.png"];

const value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

ShuffleDeck();
createCardDealer("./Sprites/Card Back 2.png");
drawHiddenCard();
drawCardDealer();

hitButton();
dealButton();
standButton();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkEndGame(){
    scoreDealer = 0;
    scorePlayer = 0;
    scoreDealer = currentScoreDealer(scoreDealer, dealerDeck);
    scorePlayer = currentScore(scorePlayer, playerDeck);

    if(scorePlayer === scoreDealer){
        console.log("draw.")
        displayMessage("Draw");
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }else if(scoreDealer > 21){
        console.log("Dealer lost.");
        displayMessage("Dealer lost");
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }else if(scorePlayer > 21){
        console.log("Player lost");
        displayMessage("Player lost");
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }else if(scorePlayer > scoreDealer){
        console.log("Player won");
        displayMessage("Player won");
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }else if(scorePlayer < scoreDealer){
        console.log("Dealer won");
        displayMessage("Dealer won");
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }
}

function checkPlayerLost(){
    scoreDealer = 0;
    scorePlayer = 0;
    scoreDealer = currentScoreDealer(scoreDealer, dealerDeck);
    scorePlayer = currentScore(scorePlayer, playerDeck);

    if(scorePlayer > 21){
        console.log("Player lost.");
        displayMessage("Player lost");
        showHiddenCard();
        document.getElementById("hit").disabled = true;
        document.getElementById('stand').disabled = true;
    }
}

function displayMessage(message){
    let text = document.createElement('p');
    
    text.textContent = message;
    text.classList = "message";

    let container = document.getElementById('Message');
    container.appendChild(text);
}

async function hitButton(){
    let hit = document.getElementById("hit");
    hit.addEventListener("click", drawCardPlayer);
}

function dealButton(){
    let deal = document.getElementById("deal");
    deal.addEventListener("click", function(){location.reload()});
}

function standButton(){
    let stand = document.getElementById("stand");
    stand.addEventListener("click", ()=>{ setTimeout(Stand())}, 2000);
}

async function Stand(){
    showHiddenCard();
    document.getElementById("hit").disabled = true;
    document.getElementById('stand').disabled = true;

    while(scoreDealer <=17){
        await delay(2000); 
        drawCardDealer();
        scoreDealer = 0;
        scoreDealer = currentScoreDealer(scoreDealer, dealerDeck);
    }
    checkEndGame();
    
}

function ShuffleDeck(){

    for (let i = 0; i < deck.length; i++) {
            let x = Math.floor(Math.random() * 3);
            const temp = deck[x];
            deck[x] = deck[i];
            deck[i] = temp;
    }
}

async function createCardDealer(route){
    const card = document.createElement('img');
    card.src = route;
    card.classList.add("Card");

    const container = document.getElementById("Dealer");
    container.appendChild(card);
}

function showHiddenCard(){
    let div = document.getElementById("Dealer");
    let toDelete = div.firstElementChild;

    if (toDelete) {
        div.removeChild(toDelete);
    }

    const hiddenCard = document.createElement('img');
    hiddenCard.src = hidden;
    hiddenCard.classList.add("Card");

    div.insertBefore(hiddenCard, div.firstElementChild);

}

function createCardPlayer(route){
    const card = document.createElement('img');
    card.src = route;
    card.classList.add("Card");

    const container = document.getElementById("Player");
    container.appendChild(card);
}

function createButton1(){
    a1ValueSelected = false;
    let created = document.getElementById('button1');

    if(!created){
        const btn = document.createElement('button');
        btn.textContent = 1;
        btn.id = 'button1';
        btn.classList.add("button");

        const container = document.getElementById("Player");
        container.appendChild(btn);

        btn.addEventListener("click", value1ForASelected);
    }
}

function createButton11(){
    a11ValueSelected = false;
    let created = document.getElementById('button11')

    if(!created){
        const btn = document.createElement('button');
        btn.textContent = 11;
        btn.id = 'button11';
        btn.addEventListener("click", value11ForASelected);
        btn.classList.add("button");

        const container = document.getElementById("Player");
        container.appendChild(btn);

        btn.addEventListener("click", value11ForASelected);
    }
}

function value1ForASelected(){
    a1ValueSelected = true;
    scorePlayer+=1;
    let button1 = document.getElementById('button1');
    let button11 = document.getElementById('button11');

    if(button1){
    button1.remove();
    button11.remove();
    }
}

function value11ForASelected(){
    a11ValueSelected = true;
    scorePlayer+=11;
    let button1 = document.getElementById('button1');
    let button11 = document.getElementById('button11');

    if(button1){
    button1.remove();
    button11.remove();
    }
}

function drawHiddenCard(){
    let x = Math.floor(Math.random() * deck.length);
    for(let i = 0; i < deck.length; i++){
        if(deck[i] === deck[x]){
            dealerDeck.push(deck[i]);
            hidden = deck[i];
            deck.splice(i,1);
        }
    }
}

async function drawCardDealer(){
    let x = Math.floor(Math.random() * deck.length);
    for(let i = 0; i < deck.length; i++){
        if(deck[i] === deck[x]){
            dealerDeck.push(deck[i]);
            createCardDealer(deck[i]);
            deck.splice(i,1);
        }
    }
    scoreDealer = 0;
    scoreDealer = currentScoreDealer(scoreDealer, dealerDeck);
    console.log(dealerDeck)
    console.log(scoreDealer);
}

function drawCardPlayer(){
    
    let buttonForA = document.getElementById('button1');

    if(!buttonForA){
        let x = Math.floor(Math.random() * deck.length);
        for(let i = 0; i < deck.length; i++){
            if(deck[i] === deck[x]){
                playerDeck.push(deck[i]);
                createCardPlayer(deck[i]);
                deck.splice(i,1);
            }
        }
        checkPlayerLost();
    }else{
        window.alert("You must select a value for the A");
    }
    scorePlayer = 0;
    scorePlayer = currentScore(scorePlayer, playerDeck);
    console.log(scorePlayer);
}

function currentScore(user, deck){
    for(let i = 0; i < deck.length; i++){
        for(let j = 0; j < card.length; j++){
            if(deck[i] === card[j]){
                user += value[j];
                break;
            }else if(deck[i] === "./Sprites/AC.png" || deck[i] === "./Sprites/AD.png" || deck[i] === "./Sprites/AH.png" || deck[i] === "./Sprites/AS.png"){
                if(user > 10){
                    user += 1;
                    console.log("The user in user > 10 is: " + user);
                    break;
                }else{
                    if(a1ValueSelected === false && a11ValueSelected === false){
                        createButton1();
                        createButton11();
                    }else{
                        if(a1ValueSelected){
                            user += 1;
                            break;
                        }else if(a11ValueSelected){
                            user += 11;
                            break;
                        }
                    }
                }
            }
        }
    }

    return user;

}

function currentScoreDealer(user, deck){
    for(let i = 0; i < deck.length; i++){
        for(let j = 0; j < card.length; j++){
            if(deck[i] === card[j]){
                user += value[j];
                break;
            }else if(deck[i] === "/Sprites/AC.png" || deck[i] === "/Sprites/AD.png" || deck[i] === "/Sprites/AH.png" || deck[i] === "/Sprites/AS.png"){
                if(user > 10){
                    user += 1;
                    break;
                }else if(user <= 10){
                    user += 11;
                    break;
                }
            }
        }
    }
    
    return user;
}