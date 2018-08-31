//检索信息
function searchInfo(){
	var name=$("#name").val();
	var dept=$("#dept").combobox("getText");
	//需要转化日期格式且转换为Date对象
	var start=calecon($("#start").val().trim());;
	var end=calecon($("#end").val().trim());
	//判断检索条件
	if(dept!="" && $("#start").val().trim()!="" && $("#end").val().trim()!="" && end>=start){
		//清空表格数据
		deleteDataGrid();
		$.ajax({
			url:path+"/attend/statistic.io",
			type:"post",
			dataType:"json",
			data:{"empName":name,"empDept":dept,"start":start,"end":end},
			success:function(result){
				var data=result.data;
				if(result.state==1){
				
					for(var i=0;i<data.length;i++){
						createTr(data[i].empName,data[i].dept,data[i].days,data[i].hours,data[i].late,data[i].overTime,data[i].earlyRetr);
					}
				}else{
					createTr("没有查询到该数据");
				}
				
			},
			error:function(){
				alert("查询出错");
			}
		});
	}
}
//动态插入返回的数据
function createTr(name,dept,time,hours,late,overTime,early){
	if(name!="没有查询到该数据"){
		$('#tt').datagrid('insertRow',{
		     row:{
		    	 	name:name,
		    	 	dept:dept,
		    	 	time:time+"天",
		    	 	hours:hours+"小时",
		    	 	late:late+"次",
		    	 	leaveEarly:early+"次",
		    	 	overTime:overTime+"小时"	,
		    	 	total:(hours+overTime)+"小时"
		     }
		    });
	}else{
		$('#tt').datagrid('insertRow',{
		     row:{
		    	 	name:name,
		    	 	dept:"",
		    	 	time:"",
		    	 	hours:"",
		    	 	late:"",
		    	 	leaveEarly:"",
		    	 	overTime:""	,
		    	 	total:""
		     }
		    });
	}
}
/*
 * 数据导出
 */
function dataImport(){
	var data="";
	var DATA="";
	var name=$("#name").val();
	var dept=$("#dept").combobox("getText");
	//需要转化日期格式且转换为Date对象
	var start=calecon($("#start").val().trim());;
	var end=calecon($("#end").val().trim());
	if(dept!="" && $("#start").val().trim()!="" && $("#end").val().trim()!="" && end>=start){
		$.ajax({
			url:path+"/File/dataImport.io",
			type:"post",
			dataType:"json",
			async:false,
			data:{"empName":name,"empDept":dept,"start":start,"end":end},
			success:function(result){
				if(result.state==1){
					data=result.data;
				}
			},
			error:function(){
				alert("查询双休信息失败");
			}
		});
		
		$.ajax({
			url:path+"/record/detailed.io",
			type:"post",
			dataType:"json",
			async:false,
			data:{"empName":name,"empDept":dept,"start":start,"end":end},
			success:function(result){
				if(result.state==1){
					DATA=result.data;
				
				}
			},
			error:function(){
				alert("查询早退迟到加班信息失败");
			}
		});
	}
	var str="姓名,部门,上班天数,小时数,迟到,早退,加班,总工时\n";
	var rows = $('#tt').datagrid('getRows');
	for(var i=0;i<rows.length;i++){
		for(var item in rows[i]){
            str+=`${rows[i][item] + '\t'},`;     
        }
        str+='\n';
	}
	if(data.length!=0){
		str+="姓名,部门,小时数,迟到,早退,加班,日期,星期\n"
	}

		
	for(var i=0;i<data.length;i++){
		var g=0;
		for(var item in data[i]){
			g++;
			if(g==3){
				continue;
			}
				
		 str+=`${data[i][item] + '\t'},`;	
		}
		if(new Date(data[i].dates).getDay()==0){
			str+=`${"星期日" + '\t'},`; 
		}
		if(new Date(data[i].dates).getDay()==6){

			str+=`${"星期六"+ '\t'},`; 
		}
		str+='\n';
	}
	if(DATA.length!=0){
		str+="姓名,日期,早上上班,中午下班,下午上班,晚上下班,部门 \n"
	}
	for(var i=0;i<DATA.length;i++){
		var g=0;
		for(var item in DATA[i]){
			g++;
			if(g==8){
				continue;
			}
			str+=`${DATA[i][item]+ '\t'},`;
		}
		str+='\n';
	}
	 //encodeURIComponent解决中文乱码
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    //通过创建a标签实现
    var link = document.createElement("a");
    link.href = uri;
    //对下载的文件命名
    link.download =  "工时统计表.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//创建tr
function create(dates,morn,noon,after,nigth){
	var tr="<tr>";
	   tr+="<td>"+dates+"</td>";
	   tr+="<td>"+morn+"</td>";
	   tr+="<td>"+noon+"</td>";
	   tr+="<td>"+after+"</td>";
	   tr+="<td>"+nigth+"</td>";
	   tr+="</tr>";
	  var $tr=$(tr);
	  $(".tab_t").append($tr);
}
//删除表格行
function delTr(){
	//获取元表格数据，逐行删除
	var data=$(".tab_t").find("tr");
	for(var i=1;i<data.length;i++){
		data[i].remove();
	}
}