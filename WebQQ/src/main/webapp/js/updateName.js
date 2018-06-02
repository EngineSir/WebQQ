//加载ID
function loadID(){
	$.ajax({
		url:path+"/showInfo.do",
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.state==0){
				var data=result.data;
				$('#idval').val(data.id);
			}
		},
		error:function(){
			alert("显示失败");
		}
	});
}
//确定修改
function updataBtn(){
	var nickName=$('#nick').val();
	var pwd=$('#pwd').val();
	var persona=$('#personality').val();
	var ID=$('#idval').val();
	$.ajax({
		url:path+"/updateInfo.do",
		type:"post",
		dataType:"json",
		data:{"nickName":nickName,"pwd":pwd,"persona":persona,"ID":ID},
		success:function(result){
			if(result.state==0){
				window.location.href="index.html";
			}
		},
		error:function(){
			alert("更新失败");
		}
	});
}