function circleDraw(piece){ //원 그리기
	var ctx = piece.canvas.getContext('2d');
	var size = piece.canvas.width/2;
	ctx.beginPath();
	ctx.arc(size, size, size, size, Math.PI*size, false);
	ctx.fillStyle = piece.color;
	ctx.fill();
	ctx.closePath();
}

function circleClick(piece){ // 원 클릭
	if(!piece.click){
		circleInit();
		canvasRemove(piece);
		piece.click = true;
		if(piece.color == 'red'){
			piece.color = '#ff6666';
		}else if(piece.color == 'green'){
			piece.color = '#99ff99';
		}
		circleDraw(piece);
		textDraw(piece);
		pieceTemp = piece;
		nextPiece = Array.from(circleMoveSet(piece));
		//console.log(nextPiece);
	}else{
		circleInit();
		pieceTemp = null;
	}
}

function circleInit(){// 원 초기화
	if(pieceTemp != null){
		canvasRemove(pieceTemp);
		pieceTemp.click = false;
		if(pieceTemp.color == '#ff6666'){
			pieceTemp.color = 'red';
		}else if(pieceTemp.color == '#99ff99'){
			pieceTemp.color = 'green';
		}
		circleDraw(pieceTemp);
		textDraw(pieceTemp);
	}
}

function circleMove(piece){ //원 이동
	if(nextPiece.indexOf(piece.loc) > -1){
		pieceTemp.click = false;
		piece.name = pieceTemp.name;
		piece.subname = pieceTemp.subname;
		piece.color = pieceTemp.color;
		piece.player = pieceTemp.player;
		piece.vali = 'on';
		pieceTemp.vali = 'off';
		canvasRemove(pieceTemp);
		pieceTemp = null;
		circleDraw(piece);
		textDraw(piece);
		return true;
	}else{
		circleInit();
		pieceTemp = null;
		return false;
	}
}

function circleMoveSet(piece){ // 원 공격 설정
	var name = piece.subname;
	var comb = textSplit(piece);
	var mixArr = null;
	//console.log('loc :::: '+piece.loc+' / name ::::: '+name);
	if(name == 'K'){// 왕
		mixArr = textMixK(comb);
	}else if(name == 'G'){// 장
		mixArr = textMixG(comb);
	}else if(name == 'S'){// 상
		mixArr = textMixS(comb);
	}else if(name == 'J'){// 자
		mixArr = textMixJ(comb);
	}else if(name == 'H'){// 후
		
	}
	return mixArr;
}

function circleAttack(piece){ // 원 공격
	if(pieceTemp.player == 'A'){
		pieceTemp.color = 'red';
	}else if(pieceTemp.player == 'B'){
		pieceTemp.color = 'green';
	}
	if(nextPiece.indexOf(piece.loc) > -1 && piece.player != pieceTemp.player){
		if(piece.subname == 'K') {
			startYN = false;	
		}
		pieceTemp.click = false;
		piece.name = pieceTemp.name;
		piece.subname = pieceTemp.subname;
		piece.color = pieceTemp.color;
		piece.player = pieceTemp.player;
		piece.vali = 'on';
		pieceTemp.vali = 'off';
		canvasRemove(pieceTemp);
		pieceTemp = null;
		circleDraw(piece);
		textDraw(piece);
		return true;
	}else{
		circleInit();
		pieceTemp = null;
		return false;
	}
}