function textDraw(piece){ //글씨 쓰는 함수
	var ctx = piece.canvas.getContext('2d');
	var size = piece.canvas.width/2;
	ctx.font = "100px malgun gothic"; //폰트의 크기, 글꼴체 지정      
	ctx.fillStyle = 'black'; //색상지정
	ctx.fillText(piece.name,size-53,size+33); //텍스트, x,y좌표
}

function textInit(piece){ //글씨 초기화
	if(piece.name != ''){
		textDraw(piece);
	}
}

function textComb(text,order){ //글자 조합
	var Arr = new Array();
	Arr[0] = Number(text);
	if(Number(text)>1){
		Arr[1] = Number(text)-1;	
	}else{
		Arr[1] = 0;
	}
	if(Number(text)<Number(order)){
		if(Arr[1] > 0){
			Arr[2] = Number(text)+1;
		}else{
			Arr[1] = Number(text)+1;
		}
	}
	Arr.sort();
	return Arr;
}

function textSplit(piece){ //글자 자르기
	var loc= piece.loc;
	var first = loc.substr(0,1);
	var second = loc.substr(1,1);
	var firstComb = textComb(first,4);
	var secondComb = textComb(second,3);
	var comb = new Object();
	comb.first = first;
	comb.second = second;
	comb.fcomb = firstComb;
	comb.scomb = secondComb;
	comb.player = piece.player;
	return comb;
}

function textMixK(comb){ //글자 섞기 (K)
	var mixArr= new Array();
	var cnt = 0;
	comb.fcomb.forEach(function(arr1){
		comb.scomb.forEach(function(arr2){
			mixArr[cnt] = arr1+''+arr2;
			cnt++;
		});
	});
	mixArr = new Set(mixArr);
	return mixArr;
}

function textMixG(comb){ //글자 섞기 (G)
	var mixArr= new Array();
	var cnt = 0;
	comb.fcomb.forEach(function(arr1){
		mixArr[cnt] = arr1+''+comb.second;
		cnt++;
	});
	comb.scomb.forEach(function(arr2){
		mixArr[cnt] = comb.first+''+arr2;
		cnt++;
	});
	mixArr = new Set(mixArr);
	return mixArr;
}

function textMixS(comb){ //글자 섞기 (S)
	var mixArr= new Array();
	var cnt = 0;
	comb.fcomb.forEach(function(arr1){
		comb.scomb.forEach(function(arr2){
			if(arr1 != comb.first && arr2 != comb.second){
				mixArr[cnt] = arr1+''+arr2;
				cnt++;
			}
		});
	});
	mixArr = new Set(mixArr);
	return mixArr;
}

function textMixJ(comb){ //글자 섞기 (J)
	var mixArr= new Array();
	var cnt = 0;
	comb.fcomb.forEach(function(arr1){
		if(comb.player == 'B' && arr1 > comb.first){ //초록색 말일때
			mixArr[cnt] = arr1+''+comb.second;
			cnt++;
		}else if(comb.player == 'A' && arr1 < comb.first){ //빨강색 말일때
			mixArr[cnt] = arr1+''+comb.second;
			cnt++;			
		}
	});
	mixArr = new Set(mixArr);
	return mixArr;
}

function textMixH(comb){ //글자 섞기 (H)
	console.log(comb);
	var mixArr= new Array();
	var cnt = 0;
	comb.fcomb.forEach(function(arr1){
		comb.scomb.forEach(function(arr2){
			mixArr[cnt] = arr1+''+arr2;
			cnt++;
		});
	});
	mixArr = new Set(mixArr);
	console.log(mixArr);
	return mixArr;
}

