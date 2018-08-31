//确定添加请假信息
function sureLeave(){
	var name=$("#name").val().trim();
	var dept=$("select#chooseDept option:selected").text().trim();
	var start=$("#start").val().trim();
	var end=$("#end").val().trim();
	if(name!="" && dept!="" && start!="" && end!=""){
		$.ajax({
			url:path+"/leave/addLeave.io",
			type:"post",
			dataType:"json",
			data:{"empName":name,"dept":dept,"startDate":start,"endDate":end},
			success:function(result){
				if(result.state==1){
					$(".opacity_bg").hide();
					$(".show").hide();
					$(".record_show").hide();
				}else{
					alert(result.msg);
				}
			},
			error:function(){
				alert("添加请假信息出错");
			}
		});
	}
}//查询请假信息
function searchLeave(){
	jsonData.value = $('input:radio:checked').val();
	jsonData.name=$("#text").val();
	//替换所有-
	jsonData.startDate=$("#date").val().replace(/-/g,"/");
	jsonData.endDate=$("#date1").val().replace(/-/g,"/");
	if(jsonData.value!="" && jsonData.startDate<=jsonData.endDate && jsonData.endDate!=""){
		searchAjax(jsonData);
	}
}
//ajax
function searchAjax(jsonData){
	$.ajax({
		url:path+"/leave/searchLeave.io",
		type:"post",
		dataType:"json",
		data:{"name":jsonData.name,"value":jsonData.value,"startDate":jsonData.startDate,"endDate":jsonData.endDate,"page":jsonData.page},
		success:function(result){
			delTr();
			var data=result.data;
			for(var i=0;i<data.length;i++){
				createTr(data[i].empName,data[i].dept,data[i].startDate,data[i].endDate);
			}
			if(data.length<6){
				$("#down").attr('disabled',true);
			}else{
				$("#down").attr('disabled',false);
			}
		},
		error:function(){
			alert("查询出错");
		}
	});
}
//下一页
function downPage(){
	delTr();
	$("#up").attr('disabled',false);
	jsonData.page+=1;
	searchAjax(jsonData);
}
//上一页
function upPage(){
	$("#down").attr('disabled',false);
	delTr();
	jsonData.page-=1;
	searchAjax(jsonData);
	if(jsonData.page==1){
		$("#up").attr('disabled',true);
	}
}
//删除表格行
function delTr(){
	//获取元表格数据，逐行删除
	var data=$(".showtab").find("tr");
	for(var i=1;i<data.length;i++){
		data[i].remove();
	}
}
//创建tr
function createTr(name,dept,start,end){
	var tr="<tr>";
	   tr+="<td>"+name+"</td>";
	   tr+="<td>"+dept+"</td>";
	   tr+="<td>"+start+"-----"+end+"</td>";
	   tr+="</tr>";
	  var $tr=$(tr);
	  $(".showtab").append($tr);
}
/*
查询部门
*/
function queryDept(){
$.ajax({
	url:path+"/dept/queryDept.io",
	success:function(result){
		if(result.state==1){
			delTr();
			var data=result.data;
			for(var i=0;i<data.length;i++){
				createS(data[i].deptName,i);
			}
		}
	},
	error:function(){
		alert("查询部门失败");
	}
});
}
function createS(Deptname,i){
	var li= '<option value='+i+'>'+Deptname+'</option>';
	var $li=$(li);
	$("#chooseDept").append($li);
}