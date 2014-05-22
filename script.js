$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	var shuffleDeck = _.shuffle(deck);

	//shuffle the deck
	var cards_player_1 = shuffleDeck.slice(0, shuffleDeck.length/2);
	var cards_player_2 = shuffleDeck.slice(shuffleDeck.length/2, shuffleDeck.length);
	//divide out the cards into the two arrays

	
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(p1, p2) {
		if(p1>p2){
			return "p1";
		}
		else if(p1<p2) {
			return "p2";
		}
		else {
			return false;
		};
	};
	
	function tie() {
		var tieNum = 3
		var tieLoop = true;
		while(tieLoop) {
			var p1card = cards_player_1[tieNum].number;
			var p2card = cards_player_2[tieNum].number;
			var winner = war(p1card,p2card);
			
			if(winner === "p1"){
				for(i=0; i<tieNum; i++) {
					cards_player_1.push(cards_player_1[i]);
					cards_player_1.push(cards_player_2[i]);
					cards_player_1.shift();
					cards_player_2.shift();
				};
				tieLoop = false;
			}
			else if(winner === "p2") {
				for(i=0; i<tieNum; i++) {
					cards_player_2.push(cards_player_2[i]);
					cards_player_2.push(cards_player_1[i]);
					cards_player_2.shift();
					cards_player_1.shift();
				};
				tieLoop = false;
			}
			else {
				tieNum += 4;
			};

		};

	};
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var p1card = cards_player_1[0].number;
		var p2card = cards_player_2[0].number;
		var winner = war(p1card,p2card);

		if(winner === "p1"){
			cards_player_1.push(cards_player_1.shift());
			cards_player_1.push(cards_player_2[0]);
			cards_player_2.shift();
		}
		else if(winner === "p2") {
			cards_player_2.push(cards_player_2.shift());
			cards_player_2.push(cards_player_1[0]);
			cards_player_1.shift();
		}
		else {
			tie();
		};
		
		//this function (defined below) will continue to the next turn
		advance();
	};
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});