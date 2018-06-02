//显示个人信息
function showInfo(){
	$.ajax({
		url:path+"/showInfo.do",
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.state==0){
				var data=result.data;
				userID=data.userId;
				console.log(userID);
				//显示昵称
				$('#ID').text(data.nickName);
				//显示个性签名
				$('#personality').text(data.autograph);
			}
		},
		error:function(){
			alert("显示失败");
		}
	});
}
//搜索用户
function searchUse(){
	var text=$('#sear_text').val();
	if(text!=""){
		$.ajax({
			url:path+"/searchUse.do",
			type:"post",
			dataTypr:"json",
			data:{"text":text},
			success:function(result){
				if(result.state==0){
					$('.result_bg').empty();
					var data=result.data;
					
					var max=5;
					if(max>data.length){
						max=data.length;
					}
					for(var i=0;i<max;i++){
						createTr(data[i].nickName,data[i].id,data[i].userId);
					}
				}
			},
			error:function(){
				alert("搜索失败");
			}
		});
	}
}
function createTr(nick,id,userId){
	var str="";
	str+="<tr>";
	str+="<td class='td_style'><span>"+nick+"("+id+")"+"</span></td>";
	str+="<td><button type='button' class='addFrientBtn'>加好友</button></td>";
	str+="</tr>";
	var $tr=$(str);
	$tr.data("userId",userId);
	$('.result_bg').append($tr);
}
//显示分组
function showGroup(){
	var friend="";
	$.ajax({
		url:path+"/friend/getFriendList.do",
		type:"post",
		dataType:"json",
		async:false,
		success:function(result){
			friend=result.data;
			
		},
		error:function(){
			alert("获取好友列表失败");
		}
	});
	
	
	$.ajax({
		url:path+"/group/queryGroup.do",
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.state==0){
				var data=result.data;
			
			for(var i=0;i<data.length;i++){
				
				if(data[i].friendId==null){
					createLi(data[i].groupName,data[i].groupId,i);
					for(var j=0;j<data.length;j++){
						if(data[i].groupName==data[j].groupName & data[j].friendId!=null){
							
							for(var k=0;k<friend.length;k++){
								if(data[j].friendId==friend[k].userId){
									
									createFriendList(friend[k].nickName,i,data[j].friendId);
									
								}
							}
						}
					}
				}				
			}
			}
		},
		error:function(){
			alert("查询失败");
		}
	});
}
function createLi(grouName,groupId,i){
	var li="";
	li+='<li class="list-group-item">';
	li+='<div>';
	li+='<div class="panel-heading" class="container">';
	li+='<h4 class="panel-title">';
	li+='<a data-toggle="collapse" data-parent="#accordion"';
	li+='href="#collapse'+i+'">';
	li+='<span class="glyphicon glyphicon-chevron-right" id="group_name">'+grouName+'</span>';
	li+='</a>';
	li+='<button type="button" class="btn btn-primary up_btn"';
	li+='data-container="body" data-toggle="popover" data-placement="right" ';
	li+='data-content="<input type='+"'text'"+" class='uptext'>";
	li+="<button type='button' class='upda'>修改</button>"+'">';
	li+='<span class="glyphicon glyphicon-pencil"></span>';
	li+='</button>		';
	li+='</h4>';
	li+='</div>';
	li+='<div id="collapse'+i+'" class="panel-collapse collapse" >';
	/*li+='<div class="panel-body" class="container">';
				li+='<a class="show">engine';
				li+='	<span id="state">上线</span>';
				li+='</a>';	
	li+='</div>';*/
	li+='</div>';
	li+='</div>';
	li+='</li>';
	var $li=$(li);
	$li.data("groupId",groupId);
	$("#grouplist").append($li);
}
function addFrient(){
	var userId=$(this).parent().parent().data("userId");
	var websocket=null;
	var data="";
	$.ajax({
		url:path+"/showInfo.do",
		type:"post",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.state==0){
				data=result.data;
				
			}
		},
		error:function(){
			alert("显示失败");
		}
	});
	
	if('WebSocket' in window){
		websocket=new WebSocket("ws://localhost:8080/WebQQ/client/addFriend.do");
	}else{
		alert("不支持websocket");
	}
	
		//连接错误的回调方法
		websocket.onerror=function(){
			console.log("连接错误");
		}
		//连接成功
		
		websocket.onopen=function(){
			
			websocket.send(userId+"%"+data.userId);
			//console.log(userId+" "+data.userId)
			
		}
		//接受消息
		websocket.onmessage=function(event){
			
			/*console.log(66666666666);
			var info="";
			$.ajax({
				url:path+"/queryUserId.do",
				type:"post",
				dataType:"json",
				data:{"ID":event.data},
				async:false,
				success:function(result){
					if(result.state==0){
						info=result.data;
						
					}
				},
				error:function(){
					alert("显示失败");
				}
			});
			var li='<li class="list-group-item"><span class="show">';
			li+=''+info.nickName+'';
			li+='</span>';
			li+='<button type="button" class="sessBTN" id="agree">同意</button>';
			li+='<button type="button" class="sessBTN">拒绝</button>';
			li+='</li>';
			var $li=$(li);
			$li.data("userId",userId);
			$('#seslist').append($li);*/
			
			
			$('#grouplist').empty();
			showGroup();
		}
		//连接关闭
		websocket.onclose=function(){
			console.log("连接关闭");
			websocket.close();
		}
		
}
function init(){
	
	if('WebSocket' in window){
		websocket=new WebSocket("ws://localhost:8080/WebQQ/client/addFriend.do");
	}else{
		alert("不支持websocket");
	}
		//连接错误的回调方法
	websocket.onerror=function(){
			console.log("连接错误");
		}
		//连接成功
		
/*	websocket.onopen=function(){
			
			
		}*/
		//接受消息
	websocket.onmessage=function(event){
			
			var info="";
			$.ajax({
				url:path+"/queryUserId.do",
				type:"post",
				dataType:"json",
				data:{"ID":event.data},
				async:false,
				success:function(result){
					if(result.state==0){
						info=result.data;
						console.log(info);
					}
				},
				error:function(){
					alert("显示失败");
				}
			});
			var li='<li class="list-group-item"><span class="show">';
			li+=''+info.nickName+'';
			li+='</span>';
			li+='<button type="button" class="sessBTN" id="agree">同意</button>';
			li+='<button type="button" class="sessBTN">拒绝</button>';
			li+='</li>';
			var $li=$(li);
			$li.data("userId",info.userId);
			$('#seslist').append($li);			
			$('#grouplist').empty();
			showGroup();
		}
		//连接关闭
	websocket.onclose=function(){
			console.log("连接关闭");
			socket.close();
		}
}
function agreeFriend(){
	//好友id
	var friendId=$(this).parent().data("userId");
	var data="";
	$.ajax({
		url:path+"/showInfo.do",
		type:"post",
		dataType:"json",
		async:false,
		success:function(result){
			if(result.state==0){
				data=result.data;
			}
		},
		error:function(){
			alert("显示失败");
		}
	});
	var userId=data.userId;
	$.ajax({
		url:path+"/friend/addfriendlist.do",
		type:"post",
		async:false,
		dataType:"json",
		data:{"userId":userId,"friendId":friendId},
		success:function(result){
			if(result.state==0){
				data=result.data;
				
			}
		},
		error:function(){
			alert("添加失败");
		}
	});
	
	
	/*var websocket=null;
	if('WebSocket' in window){
		websocket=new WebSocket("ws://localhost:8080/WebQQ/client/addFriend.do");
	}else{
		alert("不支持websocket");
	}*/
		//连接错误的回调方法
		websocket.onerror=function(){
			console.log("连接错误");
		}
		//连接成功
		
		//websocket.onopen=function(){
			websocket.send(friendId+"%"+userId);
			
		//}
		//接受消息
		//websocket.onmessage=function(event){
			//console.log(event.data);
		//}
		//连接关闭
		websocket.onclose=function(){
			console.log("连接关闭");
			websocket.close();
		}
}
function getFriendList(){
	$.ajax({
		url:path+"/friend/getFriendList.do",
		type:"post",
		dataType:"json",
		success:function(result){
			//console.log(result.data);
		},
		error:function(){
			alert("获取好友列表失败");
		}
	});
}
function createFriendList(nickName,i,friendId){
	var li="";
	li+='<div class="panel-body" class="container">';
	li+='<a class="show">'+nickName;
	li+='	<span id="state">上线</span>';
	li+='</a>';	
	li+='</div>';
	//var id='"#collapse'+i;
	var $li=$(li);
	$li.data("friendId",friendId);
	$('#collapse'+i).append($li);
}
function initFriendMessage(){
	
	if('WebSocket' in window){
		socket=new WebSocket("ws://localhost:8080/WebQQ/chat/message.do");
	}else{
		alert("不支持websocket");
	}
		//连接错误的回调方法
	socket.onerror=function(){
			console.log("连接错误");
		}
		//连接成功
		
	socket.onopen=function(){	
		console.log("连接成功");
		}
		//接受消息
	
		//连接关闭
	socket.onclose=function(){
			console.log("连接关闭");
			socket.close();
		}
}