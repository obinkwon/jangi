function imageDraw(piece){ //이미지 그리기

    //이미지 객체 생성
    var imgClo = new Image();

    //페이지 로드후 이미지가 로드 되었을 때 이미지 출력
    imgClo.addEventListener('load', function(){
        //로드된 이미지를 캔버스에 출력
        var ctx = piece.canvas.getContext("2d");

        //drawImage ( image sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage( imgClo , 10, 10, piece.canvas.width-20, piece.canvas.height-20);
    },false);

    //이미지 경로 설정
    imgClo.src='./image/'+piece.img;

}


function imageInit(){ //이미지 초기화
    if(pieceTemp != null){
        pieceTemp.click = false;
		//imageDraw(pieceTemp);
	}
}

function imageClick(piece){ //이미지 클릭
    if(!piece.click){
        if(pieceTemp != null){
            canvasInit();
        }
        piece.click = true;
        recticleDraw(piece);
        imageDraw(piece);
        pieceTemp = piece;
        nextPiece = Array.from(imageMoveSet(piece));
        //console.log(nextPiece);
	}else{
        canvasInit();
		pieceTemp = null;
	}
}

function imageMove(piece){ //이미지 이동
	if(nextPiece.indexOf(piece.loc) > -1){
		if(pieceTemp.subname == 'J'){
			pieceCheck(piece);
		}
        pieceTemp.click = false;
		piece.subname = pieceTemp.subname;
		piece.color = pieceTemp.color;
        piece.player = pieceTemp.player;
        piece.img = pieceTemp.img;
		piece.vali = 'on';
		pieceTemp.vali = 'off';
        canvasRemove(pieceTemp);
		pieceTemp = null;
        imageDraw(piece);
		return true;
	}else{
        canvasInit();
		pieceTemp = null;
		return false;
	}
}

function imageSet(piece){ //이미지 이동
	deadCancel();
	if(nextPiece.indexOf(piece.loc) > -1){
		piece.subname = deadTemp.subname;
		piece.color = deadTemp.color;
        piece.player = deadTemp.player;
        piece.img = piece.color+'_'+piece.subname+'.png';
		piece.vali = 'on';
        imageDraw(piece);
        deadArr[deadTemp.num] = '';
        deadTemp = null;
		return true;
	}else{
		deadTemp = null;
		return false;
	}
}

function imageAttack(piece){ //이미지 공격
	if(nextPiece.indexOf(piece.loc) > -1){
		if(piece.subname == 'K') {
			startYN = false;	
		}
		piece.color = pieceTemp.color;
		piece.player = pieceTemp.player;
		//console.log(piece);
		var dead = newPiece(piece);
		deadArr[deadArr.length] = dead;

        pieceTemp.click = false;
		piece.subname = pieceTemp.subname;
        piece.img = pieceTemp.img;
		piece.vali = 'on';
		pieceTemp.vali = 'off';
		canvasRemove(pieceTemp);
		pieceTemp = null;
		imageDraw(piece);
		return true;
	}else{
        canvasInit();
		pieceTemp = null;
		return false;
	}
}

function imageMoveSet(piece){ //이미지 공격 설정
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
		mixArr = textMixH(comb);
	}
	return mixArr;
}