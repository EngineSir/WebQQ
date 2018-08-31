function userLogin(){
			//获取参数
			$("#count_span").hide();
			$("#password_span").hide();
			var name=$("#count").val().trim();
			var password=$("#password").val().trim();
			//格式检测
			var ok=true;
			if(name==""){
				$("#count_span").show();
				ok=false;
			}
			if(password==""){
				$("#password_span").show();
				ok=false;
			}
			if(ok){
				$.ajax({
					url:path+"/mangage/login.io",
					dataType:"json",
					data:{"adminName":name,"adminPassword":password},
					type:"post",
					success:function(result){
						//用户名错误
						if(result.state==0){
							$("#count_span").show();
						}
						//校验成功，跳转页面
						if(result.state==1){
							addCookie("name",name,0);
							window.location.href="index.html";
							
						}
						//密码错误
						if(result.state==2){
							$("#password_span").show();
						}	
					},
					error:function(){
						alert("登录失败");
					}
				});
			}
			
		}