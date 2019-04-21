/*Javascript file for the memory game*/
restartGame();
const restart = document.getElementById("restart_game");
restart.addEventListener("click", restartGame);
/* resetting everything */
firstCard = false;
secondCard = false;
/* to hold the data of first card */
var firstCardClass = "";
/* to hold the data of second card */
var secondCardClass = "";
numberOfMoves = 0;
numberOfMatches = 0;

function restartGame() {
	firstCard = false;
	secondCard = false;
	numberOfMoves = 0;
	numberOfMatches = 0;
	document.getElementById("moves").innerText = numberOfMoves;
	const deck = document.getElementById('game_deck');
	for (var i = deck.children.length; i >= 0; i--) {
		deck.appendChild(deck.children[Math.random() * i | 0]);
	}
	const card = document.getElementsByClassName("card");
	for (var i = card.length - 1; i >= 0; i--) {
		card[i].className = "card";
	}
	stars();
}
document.addEventListener("click", function(evt) {
	if (evt.target.className == "card") {
		madeAMove(evt)
	}
})

function madeAMove(evt) {
	/* two cards areadly displayed */
	if (firstCard && secondCard) {
		firstCardClass.target.className = "card";
		secondCardClass.target.className = "card";
		firstCard = false;
		secondCard = false;
		return;
	}
	evt.target.className = "card open show"
	if (!firstCard) {
		firstCard = true;
		firstCardClass = evt;
	}
	/* second card just got picked. */
	else if (!secondCard) {
		/*match*/
		numberOfMoves++;
		decreaseAStar();
		if (evt.target.firstChild.nextSibling.className == firstCardClass.target.firstChild.nextSibling.className) {
			evt.target.className = "card match";
			firstCardClass.target.className = "card match";
			firstCard = false;
			secondCard = false;
			numberOfMatches++;
			finished();
		}
		/*no match*/
		else {
			secondCard = true;
			secondCardClass = evt;
		}
	}
}
/*reseting stars */
function stars() {
	document.getElementById("first_star").className = "fa fa-star";
	document.getElementById("second_star").className = "fa fa-star";
	document.getElementById("third_star").className = "fa fa-star";
}

function decreaseAStar() {
	document.getElementById("moves").innerText = numberOfMoves;
	if (numberOfMoves == 15) {
		document.getElementById("third_star").className = "fa fa-star-o";
	} else if (numberOfMoves == 25) {
		document.getElementById("second_star").className = "fa fa-star-o";
	} else if (numberOfMoves == 35) {
		document.getElementById("first_star").className = "fa fa-star-o";
	}
}

function finished() {
	if (numberOfMatches == 8) {
		alert("you made it in " + numberOfMoves + " tries");
	} else {
		return
	}
}
