/*Javascript file for the memory game*/
restartGame();
const restart = document.getElementById("restart_game");
restart.addEventListener("click", restartGame);
/* resetting everything */
firstCard = false;
secondCard = false;
/*to stop the user from fast clicking and wait till the cards are flipped back*/
holdUserFromClicking = false;
/* to hold the data of first card */
let firstCardClass = "";
/* to hold the data of second card */
let secondCardClass = "";
numberOfMoves = 0;
numberOfMatches = 0;
var sec = 0;

function pad(val) {
	return val > 9 ? val : "0" + val;
}
setInterval(function() {
	document.getElementById("seconds").innerHTML = pad(++sec % 60);
	document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
}, 1000);

function restartGame() {
	firstCard = false;
	secondCard = false;
	numberOfMoves = 0;
	numberOfMatches = 0;
	sec = 0;
	document.getElementById("moves").innerText = numberOfMoves;
	const deck = document.getElementById('game_deck');
	for (let i = deck.children.length; i >= 0; i--) {
		deck.appendChild(deck.children[Math.random() * i | 0]);
	}
	const card = document.getElementsByClassName("card");
	for (let i = card.length - 1; i >= 0; i--) {
		card[i].className = "card";
	}
	stars();
}
document.addEventListener("click", function(evt) {
	if (holdUserFromClicking) {
		return
	} else if (evt.target.className == "card") {
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
		holdUserFromClicking = false;
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
		if (evt.target.firstChild.className == firstCardClass.target.firstChild.className) {
			evt.target.className = "card match";
			firstCardClass.target.className = "card match";
			firstCard = false;
			secondCard = false;
			numberOfMatches++;
			finished();
		}
		/*no match*/
		else {
			holdUserFromClicking = true;
			setTimeout(function() {
				secondCard = true;
				secondCardClass = evt;
				madeAMove(evt); // calling this will flip the cards on their backs if they did not match.
			}, 700);
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
		/*the alert message*/
		let minutes = document.getElementById("minutes").innerHTML;
		let seconds = document.getElementById("seconds").innerHTML;
		swal("You won in " + minutes + ":" + seconds + " \nAnd " + numberOfMoves + " moves!\nWhat do you want to do?", {
			buttons: {
				cancel: "Close",
				again: {
					text: "Play Again",
					value: "again",
				}
			},
		}).then((value) => {
			switch (value) {
				case "again":
					restartGame();
					break;
				default:
			}
		});
	} else {
		return
	}
}
