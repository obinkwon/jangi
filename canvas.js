function canvasRemove(piece){ //캔버스 초기화
	var ctx = piece.canvas.getContext('2d');
	ctx.clearRect(0, 0, piece.canvas.width, piece.canvas.height);
}


function canvasClick(num){ //캔버스 클릭
	if(startYN){
		if(pieceTemp != null){//전에 선택한 말이 있을때
			if(piArr[num].vali == 'on'){ //말 클릭
				if(pieceTemp.player = turn){ //내 차례가 맞을때
					if(pieceTemp.player != piArr[num].player){
						var player = pieceTemp;
						var pass = imageAttack(piArr[num]);
						if(!startYN && pass){ //게임 종료 체크
							gameOver(player);
						}
						turnCheck(pass); //턴 넘기기
					}else{ //내거 다시 클릭했을때
						imageClick(piArr[num]);
					}
				}
			}else if(piArr[num].vali == 'off'){
				var pass = imageMove(piArr[num]);
				turnCheck(pass); //턴 넘기기
			}
		}else{ //움직일 말 선택
			if(deadClick){ //포로 선택시
				if(piArr[num].vali == 'on'){ //해당위치에 말이 있을때
					deadCancel();
				}else{ //해당위치에 말이 없을때
					var pass = imageSet(piArr[num]);
					turnCheck(pass); //턴 넘기기
				}
			}else{
				if(piArr[num].vali == 'on' && piArr[num].player == turn){
					imageClick(piArr[num]);
				}
			}
		}
	}
}

function canvasInit(){ //이전 캔버스 초기화
	imageInit();
	rectInit();
	imageDraw(pieceTemp);
}

function newPiece(dead){ //죽은말 정보 담기
	var piece = new Object();
	piece.subname = dead.subname;
	piece.num = deadArr.length;
	piece.color = dead.color;
	piece.player = dead.player;
	piece.img = 'dead_'+piece.subname+'.png';
	piece.click = false;
	return piece;
}

