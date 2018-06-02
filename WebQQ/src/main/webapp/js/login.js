//登录检查
function checkLogin(){
	var coder=$('#use').val();
	var pwd=$('#pwd').val();
	$.ajax({
		url:path+"/login.do",
		data:{"coder":coder,"pwd":pwd},
		dataType:"json",
		type:"post",
		success:function(result){
			if(result.state==0){
				//var userId=result.data.userId;
				window.location.href="index.html";
			}
			if(result.state==1){
				$('#pwderror').hide();
				$('#error').show();
			}
			if(result.state==2){
				$('#error').hide();
				$('#pwderror').show();
			}
		},
		error:function(){
			alert("登录失败");
		}
	});
}