package webqq.dao;

import java.util.List;

import webqq.entity.User;

public interface userDao
{
	//注册用户
	public void registerUser(User user);
	//登录检查
	public User queryUserByID(String ID);
	//修改信息
	public void updateInfo(User user);
	//搜索用户
	public List<User> searchUser(String text);
	//
	public User queryUserByuserId(String userId);
}
