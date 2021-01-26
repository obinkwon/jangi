var msg = '';

function gameStart(){// 게임 시작
	$('#startBtn').css('display','none');
	$('#deadPieceBtn').css('display','');
	startYN = true;
	turnSet();
	piArr.forEach(function(piece){
		if(piece.vali == 'on'){
			imageDraw(piece);//이미지 그리기
		}
	});
}

function reStart(){ //다시 시작
	window.location.reload();
}

function rule(){
	msg = '';
	msg += '1) 십이장기는 가로 4칸, 세로 3칸 총 12칸으로 이루어진 게임 판에서 진행되며 플레이어들의 바로 앞쪽 3칸이 각자의 진영이 된다.<hr/>';
	msg += '2) 4가지 종류의 말이 1개씩 주어지며 각 말은 지정된 위치에 놓인 상태로 게임을 시작한다.<hr/>';
	msg += '3) 각 말들은 말에 표시된 방향으로만 이동할 수 있으며 각각의 역할은 다음과 같다.<hr/>';
	msg += '4) 장(將). 자신의 진영 오른쪽에 놓이는 말로 앞, 뒤와 좌, 우로 이동이 가능하다.<hr/>';
	msg += '5) 상(相). 자신의 진영 왼쪽에 놓이며 대각선 4방향으로 이동할 수 있다.<hr/>';
	msg += '6) 왕(王). 자신의 진영 중앙에 위치하며 앞, 뒤, 좌, 우, 대각선 방향까지 모든 방향으로 이동이 가능하다.<hr/>';
	msg += '7) 자(子). 왕의 앞에 놓이며 오로지 앞으로만 이동할 수 있다.<hr/>';
	msg += '8) 하지만, 자(子)는 상대 진영에 들어가면 뒤집어서 후(侯)로 사용된다. 후(侯)는 대각선 뒤쪽 방향을 제외한 전 방향으로 이동할 수 있다.<hr/>';
	msg += '9) 게임이 시작되면 선 플레이어부터 말 1개를 1칸 이동시킬 수 있다. 말을 이동시켜 상대방의 말을 잡은 경우, 해당 말을 포로로 잡게 되며 포로로 잡은 말은 다음 턴부터 자신의 말로 사용할 수 있다.<hr/>';
	msg += '10) 게임 판에 포로로 잡은 말을 내려놓는 행동도 턴을 소모하는 것이며 이미 말이 놓여진 곳이나 상대의 진영에는 말을 내려놓을 수 없다.<hr/>';
	msg += '11) 상대방의 후(侯)를 잡아 자신의 말로 사용할 경우에는 자(子)로 뒤집어서 사용해야 한다.<hr/>';
	msg += '12) 게임은 한 플레이어가 상대방의 왕(王)을 잡으면 해당 플레이어의 승리로 종료된다.<hr/>';
	msg += '13) 만약 자신의 왕(王)이 상대방의 진영에 들어가 자신의 턴이 다시 돌아올 때까지 한 턴을 버틸 경우 해당 플레이어의 승리로 게임이 종료된다.<hr/>';
	msg += '※ 모든 말의 방향 회전은 불가능하다.<hr/>';
	msg += '※ 잡은 말을 사용할 땐 자신이 원하는 턴에 자유롭게 사용가능 하며 원하지 않으면 사용하지 않아도 무관하다.<hr/>';
	bootbox.dialog({
		title: '게임 규칙',
		message: msg,
		size: 'large',
		//onEscape: true,
		//backdrop: true,
		buttons: {
			A: {
				label: '확인',
				className: 'btn-default',
			},
		}
	});
}

function gameOver(piece){// 게임 종료
	var winner = piece.player;
	msg = '';
	msg += '<div class="theEnd">';
	msg += winner+'플레이어의 승리로 게임이 종료되었습니다<br/>';
	msg += '다시 시작 하시겠습니까?<br/>';
	msg += '</div>';
	msg += '<img class="endImage" src="./image/gameOver.jpg" alt="image">';
	bootbox.dialog({
		title: '게임 종료',
		message: msg,
		buttons: {
			A: {
				label: 'restart',
				className: 'btn-success',
				callback: function(){
					window.location.reload();
				}
			},
		}
	});
}

function turnSet(){// 시작 턴 세팅
	if(turn == 'A'){
		$('#turnDiv').text('A turn');
		$('#turnDiv').css({'color':'red'});
	}else{
		$('#turnDiv').text('B turn');
		$('#turnDiv').css({'color':'green'});
	}
}

function deadPiece(){// 죽은 말 확인 다이얼로그
	if(pieceTemp != null){
		canvasInit();
		pieceTemp = null;
	}
	msg = '';
	msg += '<div class="poroList">';
	msg += '<div class="poro">';
	msg += 'A포로';
	deadArr.forEach(function(piece,index){
		if(piece.player == 'A'){
			msg += '<a href="#" onClick="javascript:deadCheck('+index+');">';
			msg += '<img class="deadImg" src="./image/'+piece.img+'" width="150px" height="150px;">';
			msg += '</a>';
		}
	});
	msg += '</div>';
	
	msg += '<div class="poro">';
	msg += 'B포로';
	deadArr.forEach(function(piece,index){
		if(piece.player == 'B'){
			msg += '<a href="#" onClick="javascript:deadCheck('+index+');">';
			msg += '<img class="deadImg" src="./image/'+piece.img+'" width="150px" height="150px;">';
			msg += '</a>';
		}
	});
	msg += '</div>';
	msg += '</div>';
	bootbox.dialog({
		title: '포로 리스트',
		message: msg,
		buttons: {
			A: {
				label: '확인',
				className: 'btn-default',
			},
		}
	});
}


function deadCancel(){// 포로 선택 취소
	deadClick = false;
	piArr.forEach(function(piece){
		if(nextPiece.indexOf(piece.loc) > -1){
			piece.color = '#ffd9b3';
			recticleDraw(piece);
			piece.color = '';
		}
	});
	$('#deadPieceBtn').css('display','');
	$('#deadCancelBtn').css('display','none');
}