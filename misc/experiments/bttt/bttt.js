function battleTicTacToe() {
	var symbols = ['http://i.imgur.com/sNAel.png','http://i.imgur.com/THOwW.png'];
	var symbolalts = ['X', 'O'];
	var cP;
	var state;
	var lock;
	var move;
	
	function registerCBs() {
		btCallback = callback;
		btPlay = play;	
	}
	
	function reset() {
		lock = false;
		cP = 1;
		move = 0;
		state = [[0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0]];
	}
	
	function play(pID) {
		if (pID === 1) {
			reset();
			gameLoop();
		} else if (pID === 2) {
			showBoard(state[cP]);
			$('.btovr').css('display','none');
		}
		
		return false;
	}
	
	function callback(fID) {
		if (!lock) {
			var field = state[0][fID];
			if (field === 0) {
				lock = true;
				state[0][fID] = cP;
				state[cP][fID] = cP;
				++move;
				$('.bt' + fID).html(symbolHtml(cP));
				if (checkWinCond(fID)) {
					showBoard(state[0]);
					$('.btovr').html('<a class="btnot" href="#" onclick="return btPlay(1);">Player ' + cP +' won! Play again.</a>');
					setTimeout(function(){$('.btovr').css('display', 'block');}, 1000);
				} else if (move > 8) {
					showBoard(state[0]);
					$('.btovr').html('<a class="btnot" href="#" onclick="return btPlay(1);">Draw! Play again.</a>');
					setTimeout(function(){$('.btovr').css('display', 'block');}, 1000);
				} else {
					setTimeout(function(){cP = cP % 2 + 1; lock = false; gameLoop();}, 1000);
				}
			} else {
				state[cP][fID] = field;
				$('.bt' + fID).html(symbolHtml(field));
			}
		}
		
		return false;	   
	}
	
	function symbolHtml(pID) {
		return '<img class="btsmbl" src="' + symbols[pID-1] + '" alt="' + symbolalts[pID-1] + '">'
	}
	
	function showBoard(pState) {
		for (var i = 0; i < 9; ++i)
		{
			var pSi = pState[i];
			if (pSi < 0) {
				 $('.bt' + i).html('');
			}
			else if (pSi === 0) {
				$('.bt' + i).html('<a href="#" class="btLnk" onclick="return btCallback(' + i + ')"></a>');
			}
			else {
				$('.bt' + i).html(symbolHtml(pSi));
			}
		}
	}
	
	function checkWinCond(fID) {
		var won = true;
		var row = Math.floor(fID/3);
		var hor = row * 3;
		for (var i = hor; i < hor + 3; ++i) {
			if (state[0][i] !== cP) {
				won = false;
			}
		}
		if (won) {
			return true;
		}
		won = true;
		var ver = fID - hor;
		for (var i = ver; i < 9; i += 3) {
			if (state[0][i] !== cP) {
				won = false;
			}
		}
		if (won) {
			return true;
		}
		won = true;
		if (fID % 4 === 0) {
			for (var i = 0; i < 9; i += 4) {
				if (state[0][i] !== cP) {
					won = false;
				}
			}
			if (won) {
				return true;
			}
			won = true;
		}
		if (-(row - 2) + hor === fID) {
			for (var i = 2; i < 8; i += 2) {
				if (state[0][i] !== cP) {
					won = false;
				}
			}
			if (won) {
				return true;
			}
			won = true;
		}
		
		return false;
	}
	
	function gameLoop() {
		showBoard([-1,-1,-1,-1,-1,-1,-1,-1,-1]);
		$('.btovr').html('<a class="btnot" href="#" onclick="return btPlay(2);">Player ' + cP +'&#39;s turn. Press to play!</a>');
		$('.btovr').css('display', 'block');
	}
	
	return {
		init : function() {registerCBs();}
	}
}