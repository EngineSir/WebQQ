//检索信息
function searchInfo(){
	var name=$("#name").val();
	var dept=$("#dept").combobox("getText");

	//需要转化日期格式且转换为Date对象
	var start=calecon($("#start").val().trim());;
	var end=calecon($("#end").val().trim());
	//判断检索条件
	if($("#start").val().trim()!="" && $("#end").val().trim()!="" && end>=start){
		deleteDataGrid();
		$.ajax({
			url:path+"/record/queryRecord.io",
			type:"post",
			dataType:"json",
			data:{"empName":name,"empDept":dept,"start":start,"end":end},
			success:function(result){
				if(result.state==1){
					
					var data=result.data
					for(var i=0;i<data.length;i++){
						createTable(data[i].empName,data[i].dept,data[i].dates,
								data[i].workMorn,data[i].atNoon,data[i].workAfter,data[i].atNight);
					}
				}else{
					createTable("未查询到结果！");
				}
			},
			error:function(){
				alert("查询出错");
			}
		});
	}
}
/*
 * 获得数据，动态插入新行
 */
function createTable(name,dept,dates,workMorn,atNoon,workAfter,atNight){
	$('#tt').datagrid('insertRow',{
	     row:{
	    	 	name:name,
	    	 	dept:dept,
	    	 	cale:dates,
	    	 	Mwork:workMorn,
	    	 	Mduty:atNoon,
	    	 	Awork:workAfter,
	    	 	Eduty:atNight							
	     }
	    });
}
/*
 * 数据导出
 */
function dataImport(){
	var str="姓名,部门,日期,早上上班,中午下班,下午上班,晚上下班\n";
	var rows = $('#tt').datagrid('getRows');
	//console.log(rows[0]['name']);
	for(var i=0;i<rows.length;i++){
		for(var item in rows[i]){
            str+=`${rows[i][item] + '\t'},`;     
        }
		if(new Date(rows[i]["cale"]).getDay()==0){
			str+=`${"星期日" + '\t'},`; 
		}
		if(new Date(rows[i]["cale"]).getDay()==6){

			str+=`${"星期六"+ '\t'},`; 
		}
        str+='\n';
	}
	 //encodeURIComponent解决中文乱码
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    //通过创建a标签实现
    var link = document.createElement("a");
    link.href = uri;
    //对下载的文件命名
    link.download =  "考勤记录表.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	
}