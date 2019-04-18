/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

	const restart = document.getElementById("restart_game");
	restart.addEventListener("click",restartGame);

	var firstCard = false;
	var firstCardClass = "";

	/*fliping all the cards and randomize them again 
	still need to restart starts -- didnt emplement yet. //todo


	*/
	function restartGame(){
		firstCard = false;
		const ul = document.getElementById('game_deck');
		for (var i = ul.children.length; i >= 0; i--) {
    		ul.appendChild(ul.children[Math.random() * i | 0]);
		}
		const li = document.getElementsByClassName("card");
		for (var i = li.length - 1; i >= 0; i--) {
			li[i].className ="card";
		}

		
	}

	document.addEventListener("click", function(evt){
		if (evt.target.className=="card") {
			showImage(evt)
		}
		/*else if (evt.target.className=="card open show") {
			hideImage(evt)
		}*/
	})

function showImage(evt) =async () =>{
	evt.target.className ="card open show"
	if (!firstCard) {
	firstCard =true;
	firstCardClass = evt;
	}
	else {
		await delay(3000);
		/*match*/
		if (evt.target.firstChild.nextSibling.className == firstCardClass.target.firstChild.nextSibling.className) {
			evt.target.className ="card match";
			firstCardClass.target.className ="card match";

		}
		/*no match*/
		else {
			evt.target.className ="card";
			firstCardClass.target.className ="card";
		}
		firstCard =false;
	}
}


function hideImage(evt){
	evt.target.className ="card"
}

/*wait better than timeout */
const delay = ms => new Promise(res => setTimeout(res, ms));

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
