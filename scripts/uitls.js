//把字符串转换为日历对象
function calecon(cale){
	var arr=new Array(3);
	var index=cale.indexOf("/");
	arr[1]=cale.substring(0,index);
	arr[2]=cale.substring(index+1,cale.indexOf("/",index+1));
	arr[0]=cale.substring(cale.indexOf("/",index+1)+1);
	var caleNew=arr[0]+"/"+arr[1]+"/"+arr[2];
	return caleNew;
}
	/*
	每一次检索都清空之前的内容
	 */
function deleteDataGrid(){
	//获取所有行号
	var row=$('#tt').datagrid('getRows');
	//逐行删除
	var num=row.length;
	for(var i=0;i<num;i++){
		$('#tt').datagrid('deleteRow',0);
	}
}
//日期有效性
function dateValid(){
	$('#start').datebox('calendar').calendar({  
	    validator: function (date){  
	        var now = new Date();  
	        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());  
	        return today >= date;  
	    }
	}); 
}