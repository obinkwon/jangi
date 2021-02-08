function deadCheck(index){ // 포로 선택
	var mixArr = new Array();
	var cnt = 0;
	$('#deadPieceBtn').css('display','none');
	$('#deadCancelBtn').css('display','');
	$('.close').trigger('click');
	deadClick = true;
	deadTemp = deadArr[index];

	if(deadArr[index].player == 'A' && turn == 'A'){ //빨강 포로 클릭
		piArr.forEach(function(piece){
			if(piece.vali == 'off' && piece.loc.substr(0,1) != '1'){
				piece.color = 'red';
				mixArr[cnt] = piece.loc;
				cnt++;
				recticleDraw(piece);
			}
		});
		nextPiece = Array.from(mixArr);
	}else if(deadArr[index].player == 'B' && turn == 'B'){ //초록 포로 클릭
		piArr.forEach(function(piece){
			if(piece.vali == 'off' && piece.loc.substr(0,1) != '4'){
				piece.color = 'green';
				mixArr[cnt] = piece.loc;
				cnt++;
				recticleDraw(piece);
			}
		});
		nextPiece = Array.from(mixArr);
	}else{
		$('#deadPieceBtn').css('display','');
		$('#deadCancelBtn').css('display','none');
		alert(deadArr[index].player+'플레이어 차례가 아닙니다');
	}
}

function turnCheck(pass){ //턴 넘기기
	if(pass){
		if(turn == 'A'){
			turn = 'B';
			$('#turnDiv').text('B turn');
			$('#turnDiv').css({'color':'green'});
		}else{
			turn = 'A';
			$('#turnDiv').text('A turn');
			$('#turnDiv').css({'color':'red'});
		}
	}
}

function pieceCheck(piece){ //자 말 체크
	if(pieceTemp.player == 'A' && piece.loc.substr(0,1) == '1'){ //빨강 말이 후로 바뀔때
		pieceTemp.subname = 'H';
		pieceTemp.img = pieceTemp.color+'_H.png';
	}else if(pieceTemp.player == 'B' && piece.loc.substr(0,1) == '4'){ //초록 말이 후로 바뀔때
		pieceTemp.subname = 'H';
		pieceTemp.img = pieceTemp.color+'_H.png';
	}
}