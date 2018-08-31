/*
	查询部门
*/
function queryDept(){
	$.ajax({
		url:path+"/dept/queryDept.io",
		success:function(result){
			if(result.state==1){
				var da = [];
			
				var data=result.data;
				for(var i=0;i<data.length;i++){
					da.push({ "text": data[i].deptName, "id": i });
				}
				createS(da);
			}
		},
		error:function(){
			alert("查询部门失败");
		}
	});
}
function createS(data){
	
	$("#dept").combobox("loadData", data);
}