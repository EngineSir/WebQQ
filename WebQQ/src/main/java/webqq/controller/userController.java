package webqq.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import webqq.entity.User;
import webqq.paramter.Result;
import webqq.service.userService;
@Controller
public class userController
{
	@Resource
	private userService userservice;
	@RequestMapping("/register.do")
	@ResponseBody
	/*
	 * 执行注册
	 */
	public Result<Object> executeRegister(String ID,String nickName,String pwd,String autograph) throws Exception{
		Result<Object> result=new Result<Object>();
		result=userservice.registerUser(ID,nickName,pwd,autograph);	
		return result;
	}
	
	
	@RequestMapping("/login.do")
	@ResponseBody
	/*
	 * 登录检查
	 */
	public Result<Object> ececuteCheckLogin(String coder,String pwd,HttpServletRequest req){
		Result<Object> result=new Result<Object>();
		result=userservice.checkLogin(coder,pwd,req);
		return result;
	}
	@RequestMapping("/showInfo.do")
	@ResponseBody
	/*
	 * 显示信息
	 */
	public Result<User> executeShowInfo(HttpServletRequest req){
		Result<User> result=new Result<User>();
		result=userservice.showInfo(req);
		return result;
	}
	@RequestMapping("/updateInfo.do")
	@ResponseBody
	/*
	 * 更新信息
	 */
	public Result<Object> executeUpdateInfo(String nickName, String pwd, String persona, String ID){
		Result<Object> result=new Result<Object>();
		result=userservice.updateInfo(nickName, pwd, persona, ID);
		return result;
	}
	@RequestMapping("/searchUse.do")
	@ResponseBody
	/*
	 * 搜索用户
	 */
	public Result<List<User>> executeSearchUser(String text){
		Result<List<User>> result=new Result<List<User>>();
		result=userservice.searchUser(text);
		return result;
	}
	@RequestMapping("/queryUserId.do")
	@ResponseBody
	public Result<User> executeInfo(String ID){
		
		Result<User> result=new Result<User>();
		result=userservice.queryByUserId(ID);
		return result;
	}
}
