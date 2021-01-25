function recticleDraw(piece){ //사각형 그리는 함수
	var ctx = piece.canvas.getContext('2d');
	var size = piece.canvas.width;
	ctx.beginPath();
	ctx.rect(0, 0, size, size);
	ctx.fillStyle = piece.color;
	ctx.fill();
	ctx.closePath();
}

function rectInit(){// 사각형 초기화
	if(pieceTemp != null){
		var color = pieceTemp.color;
		pieceTemp.click = false;
		pieceTemp.color = '#ffd9b3';
		recticleDraw(pieceTemp);
		pieceTemp.color = color;
	}
}