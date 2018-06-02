package webqq.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import webqq.entity.User;
import webqq.paramter.Result;

public interface userService
{
	//注册用户
	public Result<Object> registerUser(String ID,String nickName,String pwd,String autograph) throws Exception;
	//检查登录
	public Result<Object> checkLogin(String coder,String pwd,HttpServletRequest req);
	//显示信息
	public Result<User> showInfo(HttpServletRequest req);
	//修改信息
	public Result<Object> updateInfo(String nickName,String pwd,String persona,String ID);
	//搜索用户
	public Result<List<User>> searchUser(String text);
	//
	public Result<User> queryByUserId(String userId);
}
